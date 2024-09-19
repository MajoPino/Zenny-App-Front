// Function to update the current date
function dateUpdate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = today.toLocaleDateString('es-ES', options).toUpperCase();
    document.getElementById('today').innerText = formattedDate;
}

let totalBalance = 2500000;
const movements = [
    { tipe: 'gasto', concept: 'Transporte', value: 30000, date: '10/09' },
    { tipe: 'ingreso', concept: '↑', value: 50000, date: '10/09' },
    { tipe: 'gasto', concept: 'Alimentación', value: 25000, date: '09/09' },
    { tipe: 'gasto', concept: 'Salud', value: 70000, date: '08/09' },
    { tipe: 'gasto', concept: 'Entretenimiento', value: 55000, date: '08/09' },
    { tipe: 'ingreso', concept: '↑', value: 100000, date: '08/09' },
    { tipe: 'ingreso', concept: '↑', value: 7000, date: '08/09' },
];

// Function to render the table of moves
function renderMovements(filter = 'all') {
    const table = document.getElementById('table-movements');
    table.innerHTML = '';  // clean table

    const filteredMovements = filter === 'all'
        ? movements
        : movements.filter(mov => (filter === 'ingreso' ? mov.tipe === 'ingreso' : mov.tipe === 'gasto'));

    filteredMovements.forEach(mov => {
        const row = document.createElement('div');
        row.classList.add(mov.tipe === 'ingreso' ? 'income' : 'expense');

        row.innerHTML = `
            <span>${mov.concept}</span>
            <span>$${mov.value.toLocaleString('es-CO')},00</span>
            <span>${mov.date} <button class="edit-date"><img src="/public/imgs/Pencil Green.png" alt="Edit" width="20" height="20"></button></span>`;
        table.appendChild(row);
    });
}

// Function to enable the graphics button (Premium)
function enableGraphicsButton() {
    const botonGraficos = document.getElementById('graficos-btn');
    botonGraficos.classList.remove('btn-disabled');
    botonGraficos.classList.add('active');
    botonGraficos.disabled = false;
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    dateUpdate();
    renderMovements();

    // Movements filters
    document.getElementById('revenue-filter').addEventListener('click', () => renderMovements('ingreso'));
    document.getElementById('bills-filter').addEventListener('click', () => renderMovements('gasto'));
    document.getElementById('all-filter').addEventListener('click', () => renderMovements('all'));

    // Add income or expense
    document.getElementById('btn-agregar-gasto').addEventListener('click', () => {
        alert('Agregar nuevo gasto (Funcionalidad en construcción)');
    });
    document.getElementById('btn-agregar-ingreso').addEventListener('click', () => {
        alert('Agregar nuevo ingreso (Funcionalidad en construcción)');
    });

    // Enable graphics if user has premium
    const premiumUser = false;  // change to true for enable
    if (premiumUser) {
        enableGraphicsButton();
    }
});
