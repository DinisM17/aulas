// ============================
// FUNÇÕES PARA A GALERIA
// ============================

// Inicializar a galeria
function initGallery() {
    updateHeaderStats();
    setupTabListeners();
}

// Atualizar estatísticas no header
function updateHeaderStats() {
    const roomsCount = document.getElementById('headerRoomsCount');
    if (roomsCount) {
        roomsCount.textContent = quartos.length;
    }
}

// Configurar listeners para as tabs
function setupTabListeners() {
    const tabLinks = document.querySelectorAll('.nav-link[data-bs-toggle="tab"]');
    const tabTitle = document.getElementById('currentTabTitle');
    const tabDescription = document.getElementById('currentTabDescription');
    
    const tabInfo = {
        'quartos': {
            title: 'Gestão de Quartos',
            description: 'Visualize e gerencie todos os quartos do hotel'
        },
        'reservas': {
            title: 'Reservas e Tarifas',
            description: 'Gerencie reservas e visualize o sistema de tarifas'
        },
        'nova-reserva': {
            title: 'Nova Reserva',
            description: 'Faça uma nova reserva para os seus clientes'
        },
        'dashboard': {
            title: 'Dashboard de Gestão',
            description: 'Visualize estatísticas e métricas do hotel'
        },
        'galeria': {
            title: 'Galeria do Hotel',
            description: 'Conheça o Solar do Mar e as nossas instalações'
        }
    };
    
    tabLinks.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            const target = event.target.getAttribute('href').substring(1);
            if (tabInfo[target]) {
                tabTitle.textContent = tabInfo[target].title;
                tabDescription.textContent = tabInfo[target].description;
            }
            
            // Atualizar dashboard quando mostrar essa tab
            if (target === 'dashboard') {
                setTimeout(() => {
                    updateDashboard();
                }, 100);
            }
        });
    });
}

// Carregar dados iniciais da galeria
function loadGalleryData() {
    // Esta função pode ser expandida para carregar imagens reais
    console.log('Galeria carregada');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});