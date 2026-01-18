// ============================
// FUNÇÕES PARA GESTÃO DE QUARTOS
// ============================

// Carregar lista de quartos
function loadRooms(filterType = 'todos', filterStatus = 'todos') {
    const roomsList = document.getElementById('roomsList');
    if (!roomsList) return;
    
    roomsList.innerHTML = '';
    
    let filteredRooms = quartos;
    
    if (filterType !== 'todos') {
        filteredRooms = filteredRooms.filter(room => room.tipo === filterType);
    }
    
    if (filterStatus !== 'todos') {
        filteredRooms = filteredRooms.filter(room => room.status === filterStatus);
    }
    
    if (filteredRooms.length === 0) {
        roomsList.innerHTML = '<div class="alert alert-warning">Nenhum quarto encontrado com os filtros selecionados.</div>';
        return;
    }
    
    filteredRooms.forEach(room => {
        let statusText, statusClass;
        switch(room.status) {
            case 'disponivel':
                statusText = 'Disponível';
                statusClass = 'available';
                break;
            case 'ocupado':
                statusText = 'Ocupado';
                statusClass = 'reserved';
                break;
            case 'manutencao':
                statusText = 'Manutenção';
                statusClass = 'bg-secondary text-white';
                break;
        }
        
        const roomCard = `
            <div class="room-card ${statusClass}">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5>Quarto ${room.numero} <span class="badge bg-info">${room.tipo.toUpperCase()}</span></h5>
                        <p class="mb-1">${room.descricao}</p>
                        <p class="mb-0"><strong>Preço base:</strong> ${room.precoBase}€ por noite</p>
                    </div>
                    <div class="text-end">
                        <span class="badge ${room.status === 'disponivel' ? 'bg-success' : 'bg-danger'}">${statusText}</span>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="changeRoomStatus(${room.id})">
                                <i class="bi bi-arrow-repeat"></i> Alterar Estado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        roomsList.innerHTML += roomCard;
    });
}

// Filtrar quartos
function filterRooms() {
    const filterType = document.getElementById('filterRoomType').value;
    const filterStatus = document.getElementById('filterStatus').value;
    loadRooms(filterType, filterStatus);
}

// Alterar estado de um quarto
function changeRoomStatus(roomId) {
    const room = quartos.find(r => r.id === roomId);
    if (!room) return;
    
    // Ciclo de estados: disponivel -> ocupado -> manutencao -> disponivel
    if (room.status === 'disponivel') {
        room.status = 'ocupado';
    } else if (room.status === 'ocupado') {
        room.status = 'manutencao';
    } else {
        room.status = 'disponivel';
    }
    
    loadRooms();
    updateDashboard();
    
    // Mostrar mensagem
    showMessage(`Estado do quarto ${room.numero} alterado para: ${room.status}`, 'info');
}

// Adicionar quarto de teste
function addSampleRoom() {
    const newId = quartos.length > 0 ? Math.max(...quartos.map(r => r.id)) + 1 : 1;
    const roomNumber = Math.floor(Math.random() * 100) + 300;
    const types = ['single', 'double', 'suite', 'familia'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    const priceMap = { single: 70, double: 110, suite: 180, familia: 160 };
    const descMap = {
        single: 'Quarto individual com vista parcial',
        double: 'Quarto duplo standard',
        suite: 'Suíte com amenities',
        familia: 'Quarto familiar espaçoso'
    };
    
    const newRoom = {
        id: newId,
        numero: roomNumber,
        tipo: randomType,
        precoBase: priceMap[randomType],
        status: 'disponivel',
        descricao: descMap[randomType]
    };
    
    quartos.push(newRoom);
    loadRooms();
    loadRoomOptions();
    updateDashboard();
    
    showMessage(`Quarto ${roomNumber} adicionado com sucesso!`, 'success');
}