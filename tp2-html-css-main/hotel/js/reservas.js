// ============================
// FUNÇÕES PARA GESTÃO DE RESERVAS
// ============================

// Carregar lista de reservas
function loadReservations() {
    const reservationsTable = document.getElementById('reservationsTable');
    if (!reservationsTable) return;
    
    reservationsTable.innerHTML = '';
    
    if (reservas.length === 0) {
        reservationsTable.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">Não existem reservas registadas.</td>
            </tr>
        `;
        return;
    }
    
    reservas.forEach(reserva => {
        const room = quartos.find(r => r.id === reserva.quartoId);
        const roomNumber = room ? room.numero : 'N/A';
        
        let statusBadge;
        if (reserva.status === 'ativa') {
            statusBadge = '<span class="badge bg-success">Ativa</span>';
        } else if (reserva.status === 'cancelada') {
            statusBadge = '<span class="badge bg-secondary">Cancelada</span>';
        } else {
            statusBadge = '<span class="badge bg-warning">Concluída</span>';
        }
        
        const row = `
            <tr>
                <td>${reserva.id}</td>
                <td>${roomNumber}</td>
                <td>${reserva.cliente}<br><small>${reserva.email}</small></td>
                <td>${formatDate(reserva.checkIn)}</td>
                <td>${formatDate(reserva.checkOut)}</td>
                <td>${reserva.precoTotal}€</td>
                <td>${statusBadge}</td>
                <td>
                    ${reserva.status === 'ativa' ? 
                        `<button class="btn btn-sm btn-danger" onclick="cancelReservation(${reserva.id})">
                            <i class="bi bi-x-circle"></i> Cancelar
                        </button>` 
                        : '<small>Não disponível</small>'
                    }
                </td>
            </tr>
        `;
        
        reservationsTable.innerHTML += row;
    });
}

// Carregar opções de quartos para o formulário de reserva
function loadRoomOptions() {
    const roomSelect = document.getElementById('roomSelect');
    if (!roomSelect) return;
    
    roomSelect.innerHTML = '<option value="">Selecione um quarto</option>';
    
    // Mostrar apenas quartos disponíveis
    const availableRooms = quartos.filter(room => room.status === 'disponivel');
    
    availableRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = `Quarto ${room.numero} (${room.tipo}) - ${room.precoBase}€/noite`;
        roomSelect.appendChild(option);
    });
}

// Calcular preço com base nas datas e temporada
function calculatePrice(roomId, checkIn, checkOut) {
    const room = quartos.find(r => r.id === roomId);
    if (!room || !checkIn || !checkOut) return 0;
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    // Verificar se as datas são válidas
    if (start >= end) return 0;
    
    // Calcular número de noites
    const timeDiff = end.getTime() - start.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    let totalPrice = 0;
    
    // Calcular preço para cada noite
    for (let i = 0; i < nights; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const month = currentDate.getMonth() + 1; // Janeiro = 1
        
        let multiplier = tarifas.normal.multiplicador;
        
        if (tarifas.alta.meses.includes(month)) {
            multiplier = tarifas.alta.multiplicador;
        } else if (tarifas.baixa.meses.includes(month)) {
            multiplier = tarifas.baixa.multiplicador;
        }
        
        totalPrice += room.precoBase * multiplier;
    }
    
    return Math.round(totalPrice);
}

// Atualizar preço estimado no formulário
function updatePriceEstimate() {
    const roomId = parseInt(document.getElementById('roomSelect').value);
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const priceEstimate = document.getElementById('priceEstimate');
    
    if (!priceEstimate) return;
    
    if (!roomId || !checkIn || !checkOut) {
        priceEstimate.innerHTML = 'Selecione um quarto e datas para calcular o preço';
        priceEstimate.className = 'alert alert-warning';
        return;
    }
    
    const price = calculatePrice(roomId, checkIn, checkOut);
    
    if (price === 0) {
        priceEstimate.innerHTML = 'Datas inválidas. A data de check-out deve ser posterior ao check-in.';
        priceEstimate.className = 'alert alert-danger';
        return;
    }
    
    // Calcular número de noites
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    
    priceEstimate.innerHTML = `
        <strong>${price}€</strong> por ${nights} noite(s)<br>
        <small>Inclui ajustes de temporada</small>
    `;
    priceEstimate.className = 'alert alert-success';
}

// Fazer uma nova reserva
function makeReservation() {
    const roomId = parseInt(document.getElementById('roomSelect').value);
    const clientName = document.getElementById('clientName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    
    // Validações básicas
    if (!roomId || !clientName || !clientEmail || !checkIn || !checkOut) {
        showMessage('Por favor, preencha todos os campos do formulário.', 'danger');
        return;
    }
    
    // Verificar se as datas são válidas
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (start >= end) {
        showMessage('A data de check-out deve ser posterior à data de check-in.', 'danger');
        return;
    }
    
    // Verificar se o quarto ainda está disponível
    const room = quartos.find(r => r.id === roomId);
    if (!room || room.status !== 'disponivel') {
        showMessage('Este quarto já não está disponível. Por favor, selecione outro.', 'danger');
        loadRoomOptions(); // Recarregar opções
        return;
    }
    
    // Calcular preço
    const price = calculatePrice(roomId, checkIn, checkOut);
    if (price === 0) {
        showMessage('Erro ao calcular o preço. Verifique as datas.', 'danger');
        return;
    }
    
    // Criar nova reserva
    const newId = reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1;
    const newReservation = {
        id: newId,
        quartoId: roomId,
        cliente: clientName,
        email: clientEmail,
        checkIn: checkIn,
        checkOut: checkOut,
        precoTotal: price,
        status: 'ativa'
    };
    
    // Adicionar reserva ao array
    reservas.push(newReservation);
    
    // Atualizar estado do quarto para ocupado
    room.status = 'ocupado';
    
    // Atualizar a interface
    loadReservations();
    loadRooms();
    loadRoomOptions();
    updateDashboard();
    
    // Mostrar mensagem de sucesso
    showMessage(`Reserva #${newId} confirmada para ${clientName} no quarto ${room.numero} por ${price}€!`, 'success');
    
    // Limpar formulário
    clearReservationForm();
}

// Cancelar uma reserva
function cancelReservation(reservationId) {
    if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return;
    
    const reservation = reservas.find(r => r.id === reservationId);
    if (!reservation) return;
    
    // Verificar se a reserva está ativa
    if (reservation.status !== 'ativa') {
        showMessage('Esta reserva já não está ativa e não pode ser cancelada.', 'warning');
        return;
    }
    
    // Alterar estado da reserva
    reservation.status = 'cancelada';
    
    // Libertar o quarto (marcar como disponível)
    const room = quartos.find(r => r.id === reservation.quartoId);
    if (room) {
        room.status = 'disponivel';
    }
    
    // Atualizar a interface
    loadReservations();
    loadRooms();
    loadRoomOptions();
    updateDashboard();
    
    showMessage(`Reserva #${reservationId} cancelada com sucesso.`, 'info');
}

// Limpar formulário de reserva
function clearReservationForm() {
    document.getElementById('clientName').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('checkInDate').value = '';
    document.getElementById('checkOutDate').value = '';
    
    const priceEstimate = document.getElementById('priceEstimate');
    if (priceEstimate) {
        priceEstimate.innerHTML = 'Selecione um quarto e datas para calcular o preço';
        priceEstimate.className = 'alert alert-warning';
    }
    
    const reservationMessage = document.getElementById('reservationMessage');
    if (reservationMessage) {
        reservationMessage.innerHTML = '';
    }
}