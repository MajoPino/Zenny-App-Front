import {utility,GenerateInfo} from './Diagrams/IncomOutcomeDgr'

// Base URL del API
const baseURL = "https://zenny.azurewebsites.net/api/v2";

// Fetch categories from API
async function fetchCategories() {
    try {
        const response = await fetch(`${baseURL}/Category`);
        if (response.ok) {
            const categories = await response.json();
            populateExpenseCategories(categories);
        } else {
            console.error('Error fetching categories:', response.status);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }

}

// Function to update the current date
function dateUpdate() {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = today.toLocaleDateString('es-ES', options).toUpperCase();
    document.getElementById('today').innerText = formattedDate;
}


let balanceId = localStorage.getItem('id');
let arrayBalance = await GenerateInfo(balanceId);
let totalBalance = await utility(arrayBalance);
let userName = localStorage.getItem('name');

// Update the current balance and total balance
document.getElementById('total-balance').innerText = `$${totalBalance.toLocaleString('es-CO')}`;

// Update the user name
document.getElementById('usuario-nombre').innerText = `Hola, ${userName}!`;

const movements = [];  // Initialize with no movements
let currentEditingIndex = null;  // To track the index of the movement being edited

// Function to render the table of movements


// Fetch incomes from API
async function fetchIncomes(userId) {
    try {
        const response = await fetch(`${baseURL}/movement/getIncomes/${userId}`);
        if (response.ok) {
            const incomes = await response.json();
            renderMovements(incomes, 'ingreso');
        } else {
            console.error('Error fetching incomes:', response.status);
        }
    } catch (error) {
        console.error('Error fetching incomes:', error);
    }
}

// Fetch expenses from API
async function fetchExpenses(userId) {
    try {
        const response = await fetch(`${baseURL}/movement/getExpenses/${userId}`);
        if (response.ok) {
            const expenses = await response.json();
            renderMovements(expenses, 'gasto');
        } else {
            console.error('Error fetching expenses:', response.status);
        }
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

// Fetch total incomes from API
async function fetchTotalIncomes(userId) {
    try {
        const response = await fetch(`${baseURL}/movement/getTotalIncomes/${userId}`);
        if (response.ok) {
            const totalIncomes = await response.json();
            document.getElementById('total-incomes').innerText = `$${totalIncomes.toLocaleString('es-CO')}`;
        } else {
            console.error('Error fetching total incomes:', response.status);
        }
    } catch (error) {
        console.error('Error fetching total incomes:', error);
    }
}

// Fetch total expenses from API
async function fetchTotalExpenses(userId) {
    try {
        const response = await fetch(`${baseURL}/movement/getTotalExpenses/${userId}`);
        if (response.ok) {
            const totalExpenses = await response.json();
            document.getElementById('total-expenses').innerText = `$${totalExpenses.toLocaleString('es-CO')}`;
        } else {
            console.error('Error fetching total expenses:', response.status);
        }
    } catch (error) {
        console.error('Error fetching total expenses:', error);
    }
}

// Create new movement via API
async function createMovement(movementData) {
    try {
        const response = await fetch(`${baseURL}/createMovement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movementData)
        });

        if (response.ok) {
            const newMovement = await response.json();
            renderMovements([newMovement], newMovement.tipe);  // Add to the table
        } else {
            console.error('Error creating movement:', response.status);
        }
    } catch (error) {
        console.error('Error creating movement:', error);
    }
}

// Render movements in the table (both incomes and expenses)
function renderMovements(movements, type) {
    const table = document.getElementById(type === 'ingreso' ? 'income-table' : 'expense-table');
    table.innerHTML = '';  // Clear the current table content
    movements.forEach(movement => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movement.date}</td>
            <td>${movement.concept}</td>
            <td>$${movement.value.toLocaleString('es-CO')}</td>
            <td>
                <button class="btn-edit" onclick="editMovement(${movement.id})">Edit</button>
                <button class="btn-delete" onclick="deleteMovement(${movement.id})">Delete</button>
            </td>`;
        table.appendChild(row);
    });
}

// Edit movement (PUT request to API)
async function editMovement(id) {
    const newConcept = prompt("Enter new concept:");
    const newValue = parseFloat(prompt("Enter new value:"));

    if (newConcept && !isNaN(newValue)) {
        const updatedMovement = {
            concept: newConcept,
            value: newValue
        };

        try {
            const response = await fetch(`${baseURL}/MovementUpdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMovement)
            });

            if (response.ok) {
                alert('Movement updated successfully');
                location.reload();  // Reload page to reflect changes
            } else {
                console.error('Error updating movement:', response.status);
            }
        } catch (error) {
            console.error('Error updating movement:', error);
        }
    }
}

// Delete movement (DELETE request to API)
async function deleteMovement(id) {
    const confirmed = confirm("Are you sure you want to delete this movement?");
    if (confirmed) {
        try {
            const response = await fetch(`${baseURL}/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Movement deleted successfully');
                location.reload();  // Reload page to reflect changes
            } else {
                console.error('Error deleting movement:', response.status);
            }
        } catch (error) {
            console.error('Error deleting movement:', error);
        }
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    const userId = 2;  // Replace with actual user ID
    fetchCategories();
    fetchIncomes(userId);
    fetchExpenses(userId);
    fetchTotalIncomes(userId);
    fetchTotalExpenses(userId);
});

// Example usage in the "add income/expense" button event listener
document.getElementById('saveExpenseButton').addEventListener('click', function () {
    const movementData = {
        tipe: 'gasto',
        concept: document.getElementById('expense-category').value,
        value: parseFloat(document.getElementById('expense-value').value),
        date: document.getElementById('expense-date').value,
        userId: 2  // Replace with actual user ID
    };
    createMovement(movementData);
});
