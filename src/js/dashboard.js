

// Function to update the current date
function dateUpdate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = today.toLocaleDateString('es-ES', options).toUpperCase();
    document.getElementById('today').innerText = formattedDate;
}

let totalBalance = 2500000;
const movements = [];  // Initialize with no movements
let currentEditingIndex = null;  // To track the index of the movement being edited

// Function to render the table of movements
function renderMovements(filter = 'all') {
    const table = document.getElementById('table-movements');
    table.innerHTML = '';  // Clean table

    const filteredMovements = filter === 'all'
        ? movements
        : movements.filter(mov => (filter === 'ingreso' ? mov.tipe === 'ingreso' : mov.tipe === 'gasto'));

    if (filteredMovements.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-message');
        emptyMessage.innerText = 'No hay movimientos para mostrar';
        table.appendChild(emptyMessage);
    } else {
        filteredMovements.forEach((mov, index) => {
            const row = document.createElement('div');
            row.classList.add(mov.tipe === 'ingreso' ? 'income' : 'expense');
            row.classList.add("d-flex");
            row.classList.add("justify-content-between");

            if (row.classList.contains("income")) {
                row.innerHTML += `                
                <span class="w-50 d-flex justify-content-between">
                <span>Ingreso</span>
                <span>$${mov.value.toLocaleString('es-CO')}</span>
                </span>

                <span class="w-50 d-flex justify-content-between">
                <span class= "me-1 ps-5">${mov.date}</span> 
                <button class="edit-date" data-index="${index}"><img src="/public/imgs/Pencil Green.png" alt="Edit" width="20" height="20"></button>
                </span>`;
                table.appendChild(row);
            }
            else {
                row.innerHTML += `
                <span class="w-50 d-flex justify-content-between">                
                <span>${mov.concept}</span>
                <span>$${mov.value.toLocaleString('es-CO')}</span>
                </span>                
                
                <span class="w-50 d-flex justify-content-between"> 
                <span class= "me-1 ps-5">${mov.date}</span> 
                <button class="edit-date" data-index="${index}"><img src="/public/imgs/Pencil Red.png" alt="Edit" width="20" height="20"></button>
                </span>`;
                table.appendChild(row);
            }

        });

        // Add event listeners to all edit buttons
        document.querySelectorAll('.edit-date').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                openEditModal(index);  // Open the modal with the specific movement's data
            });
        });
    }
}

// Function to open the modal with the current movement details
function openEditModal(index) {
    const movement = movements[index];
    const tipe = movement.tipe;

    if (tipe == "ingreso") {
        document.getElementById('edit-income-value').value = movement.value;
        document.getElementById('edit-income-date').value = movement.date;
    }
    else {
        document.getElementById('edit-expense-category').value = movement.concept;
        document.getElementById('edit-expense-value').value = movement.value;
        document.getElementById('edit-expense-date').value = movement.date;
    }

    currentEditingIndex = index;  // Save the index of the movement being edited

    // Show the modal
    if (tipe == "ingreso") {
        const editModal = new bootstrap.Modal(document.getElementById('editIncomeModal'));
        editModal.show();
    }
    else
    {
        const editModal = new bootstrap.Modal(document.getElementById('editExpenseModal'));
        editModal.show();
    }

}

// Event listener for saving the edited expense
document.getElementById('saveEditExpenseButton').addEventListener('click', function () {
    const category = document.getElementById('edit-expense-category').value;
    const value = parseFloat(document.getElementById('edit-expense-value').value);
    const date = document.getElementById('edit-expense-date').value;

    if (category && value && date) {
        // Update the movement with the new values
        movements[currentEditingIndex].concept = category;
        movements[currentEditingIndex].value = value;
        movements[currentEditingIndex].date = date;

        // Re-render the movements table with the updated expense
        renderMovements();

        // Hide the modal after saving
        const modal = bootstrap.Modal.getInstance(document.getElementById('editExpenseModal'));
        modal.hide();

        // Clear the form after submission
        document.getElementById('editExpenseForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

//event listener for saving the edited income
document.getElementById('saveEditIncomeButton').addEventListener('click', function () {
    const value = parseFloat(document.getElementById('edit-income-value').value);
    const date = document.getElementById('edit-income-date').value;

    if (value && date) {
        // Update the movement with the new values
        movements[currentEditingIndex].value = value;
        movements[currentEditingIndex].date = date;

        // Re-render the movements table with the updated expense
        renderMovements();

        // Hide the modal after saving
        const modal = bootstrap.Modal.getInstance(document.getElementById('editIncomeModal'));
        modal.hide();

        // Clear the form after submission
        document.getElementById('editIncomeForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

// Function to add a new expense
document.getElementById('saveExpenseButton').addEventListener('click', function () {
    const category = document.getElementById('expense-category').value;
    const value = parseFloat(document.getElementById('expense-value').value);
    const date = document.getElementById('expense-date').value;

    if (category && value && date) {
        // Push new expense to the movements array
        movements.push({ tipe: 'gasto', concept: category, value: value, date: date });

        // Re-render movements table with new expense
        renderMovements();

        // Close the modal after saving
        const modal = bootstrap.Modal.getInstance(document.getElementById('addExpenseModal'));
        modal.hide();

        // Clear form after submission
        document.getElementById('addExpenseForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});



// Function to add a new income
document.getElementById('saveIncomeButton').addEventListener('click', function () {
    const value = parseFloat(document.getElementById('income-value').value);
    const date = document.getElementById('income-date').value;

    if (value && date) {
        // Push new income to the movements array
        movements.push({ tipe: 'ingreso', concept: "varios", value: value, date: date });

        // Re-render movements table with new income
        renderMovements();

        // Close the modal after saving
        const modal = bootstrap.Modal.getInstance(document.getElementById('addIncomeModal'));
        modal.hide();

        // Clear form after submission
        document.getElementById('addIncomeForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    dateUpdate();
    renderMovements();

    // Movements filters
    document.getElementById('revenue-filter').addEventListener('click', () => renderMovements('ingreso'));
    document.getElementById('bills-filter').addEventListener('click', () => renderMovements('gasto'));
    document.getElementById('all-filter').addEventListener('click', () => renderMovements('all'));

    // Open modal for adding a new expense
    document.getElementById('btn-agregar-gasto').addEventListener('click', () => {
        const addExpenseModal = new bootstrap.Modal(document.getElementById('addExpenseModal'));
        addExpenseModal.show();  // Show the modal
    });

    // Open modal for adding a new income
    document.getElementById('btn-agregar-ingreso').addEventListener('click', () => {
        const addIncomeModel = new bootstrap.Modal(document.getElementById('addIncomeModal'));
        addIncomeModel.show();
    });

    // Enable graphics if user has premium
    const premiumUser = false;  // change to true for enable
    if (premiumUser) {
        enableGraphicsButton();
    }
});
function guardian() {
    let verification = localStorage.getItem("access")
    if (verification == "true") {
        window.location.href = "../views/dashboard.html"
    }
    else{
        window.location.href = "../views/login.html"
    }
}
