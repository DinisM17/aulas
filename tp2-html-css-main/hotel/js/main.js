// ============================
// INICIALIZAÇÃO DO SISTEMA
// ============================

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Gestão Hoteleira - Solar do Mar iniciado');
    
    // Carregar dados iniciais
    loadRooms();
    loadReservations();
    loadRoomOptions();
    updateDashboard();
    generateMiniCalendar();
    initGallery();
    
    // Adicionar listeners para atualizar preço estimado
    const roomSelect = document.getElementById('roomSelect');
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    
    if (roomSelect) {
        roomSelect.addEventListener('change', updatePriceEstimate);
    }
    
    if (checkInDate) {
        checkInDate.addEventListener('change', updatePriceEstimate);
    }
    
    if (checkOutDate) {
        checkOutDate.addEventListener('change', updatePriceEstimate);
    }
    
    // Definir datas mínimas e máximas para 2025
    const today = new Date();
    const minDate = '2025-01-01';
    const maxDate = '2025-12-31';
    
    if (checkInDate) {
        checkInDate.min = minDate;
        checkInDate.max = maxDate;
    }
    
    if (checkOutDate) {
        checkOutDate.min = minDate;
        checkOutDate.max = maxDate;
    }
    
    // Mensagem de boas-vindas
    setTimeout(() => {
        showMessage('Bem-vindo ao sistema de gestão do Solar do Mar!', 'info');
    }, 1000);
    
    // Atualizar contador de quartos no header
    updateHeaderStats();
});

// Atualizar estatísticas no header
function updateHeaderStats() {
    const headerRooms = document.getElementById('headerRoomsCount');
    if (headerRooms) {
        headerRooms.textContent = quartos.length;
    }
}

// Sobrescrever a função showMessage para design novo
function showMessage(message, type = 'info') {
    const messageElement = document.getElementById('reservationMessage');
    if (!messageElement) return;
    
    let icon = 'bi-info-circle';
    let className = 'alert-info';
    
    if (type === 'success') {
        icon = 'bi-check-circle';
        className = 'alert-success';
    } else if (type === 'danger' || type === 'error') {
        icon = 'bi-exclamation-circle';
        className = 'alert-danger';
    } else if (type === 'warning') {
        icon = 'bi-exclamation-triangle';
        className = 'alert-warning';
    }
    
    messageElement.innerHTML = `
        <div class="alert ${className} alert-dismissible fade show" role="alert">
            <i class="bi ${icon} me-2"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        const alert = messageElement.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}