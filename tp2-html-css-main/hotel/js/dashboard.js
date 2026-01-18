// Adicionar ao final do dashboard.js

// Atualizar métricas detalhadas
function updateDetailedMetrics() {
    // Dias reservados
    let totalDays = 0;
    reservas.forEach(reserva => {
        if (reserva.status === 'ativa') {
            const start = new Date(reserva.checkIn);
            const end = new Date(reserva.checkOut);
            const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
            totalDays += days;
        }
    });
    
    // Taxa de ocupação (apenas como exemplo)
    const totalRooms = quartos.length;
    const occupiedRooms = quartos.filter(room => room.status === 'ocupado').length;
    const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);
    
    // Receita média por noite
    const activeReservations = reservas.filter(r => r.status === 'ativa');
    const totalRevenue = activeReservations.reduce((sum, r) => sum + r.precoTotal, 0);
    const avgRevenue = totalDays > 0 ? Math.round(totalRevenue / totalDays) : 0;
    
    // Reservas canceladas
    const cancellations = reservas.filter(r => r.status === 'cancelada').length;
    
    // Atualizar UI
    document.getElementById('daysBooked').textContent = totalDays;
    document.getElementById('occupancyRate').textContent = occupancyRate + '%';
    document.getElementById('avgRevenue').textContent = avgRevenue + '€';
    document.getElementById('cancellations').textContent = cancellations;
}

// Atualizar a função updateDashboard
function updateDashboard() {
    updateStats();
    updateCharts();
    updateRecentReservations();
    updateManagementInfo();
    updateDetailedMetrics();
    updateHeaderStats(); // Atualizar também o header
}