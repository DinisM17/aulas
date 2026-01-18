// ============================
// DADOS DO SISTEMA (arrays)
// ============================

// Array de quartos
let quartos = [
    { id: 1, numero: 101, tipo: "single", precoBase: 80, status: "disponivel", descricao: "Quarto individual com cama de solteiro" },
    { id: 2, numero: 102, tipo: "double", precoBase: 120, status: "ocupado", descricao: "Quarto duplo com cama de casal" },
    { id: 3, numero: 103, tipo: "suite", precoBase: 200, status: "disponivel", descricao: "Suíte com vista para o mar" },
    { id: 4, numero: 104, tipo: "familia", precoBase: 180, status: "disponivel", descricao: "Quarto familiar com 2 camas" },
    { id: 5, numero: 201, tipo: "single", precoBase: 75, status: "disponivel", descricao: "Quarto individual standard" },
    { id: 6, numero: 202, tipo: "double", precoBase: 110, status: "manutencao", descricao: "Quarto duplo em renovação" },
    { id: 7, numero: 203, tipo: "suite", precoBase: 220, status: "ocupado", descricao: "Suíte presidencial" },
    { id: 8, numero: 204, tipo: "familia", precoBase: 190, status: "disponivel", descricao: "Quarto familiar com varanda" }
];

// Array de reservas
let reservas = [
    { id: 1, quartoId: 2, cliente: "Maria Santos", email: "maria@email.com", checkIn: "2025-06-15", checkOut: "2025-06-20", precoTotal: 900, status: "ativa" },
    { id: 2, quartoId: 7, cliente: "Carlos Oliveira", email: "carlos@email.com", checkIn: "2025-06-10", checkOut: "2025-06-18", precoTotal: 1760, status: "ativa" },
    { id: 3, quartoId: 3, cliente: "Ana Rodrigues", email: "ana@email.com", checkIn: "2025-08-01", checkOut: "2025-08-07", precoTotal: 1800, status: "ativa" },
    { id: 4, quartoId: 1, cliente: "Pedro Martins", email: "pedro@email.com", checkIn: "2025-01-10", checkOut: "2025-01-12", precoTotal: 128, status: "cancelada" }
];

// Tarifas por temporada
const tarifas = {
    alta: { multiplicador: 1.5, meses: [6, 7, 8, 12] }, // Junho, Julho, Agosto, Dezembro
    baixa: { multiplicador: 0.8, meses: [1, 2, 11] }, // Janeiro, Fevereiro, Novembro
    normal: { multiplicador: 1.0 }
};

// ============================
// FUNÇÕES UTILITÁRIAS
// ============================

// Formatar data para exibição
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT');
}

// Mostrar mensagem na interface
function showMessage(message, type = 'info') {
    // Limpar mensagens anteriores
    const messageElement = document.getElementById('reservationMessage');
    if (!messageElement) return;
    
    let className = 'message-info';
    if (type === 'success') className = 'message-success';
    if (type === 'danger' || type === 'error') className = 'message-error';
    
    messageElement.innerHTML = `
        <div class="${className}">
            <i class="bi bi-info-circle"></i> ${message}
        </div>
    `;
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        messageElement.innerHTML = '';
    }, 5000);
}