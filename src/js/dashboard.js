
guardian()

let id = localStorage.getItem("id")

// Fetch categories from API
async function fetchCategories() {
    try {
        const response = await fetch(`https://zenny.azurewebsites.net/api/v1/Category`);
        console.log(response.json())
        if (response.status === 200) {
            console.log(response.status)
            const categories = await response.json();
            populateExpenseCategories(categories);
        } else {
            console.error('Error fetching categories:', response.status);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Function to populate categories in the select dropdown
function populateExpenseCategories(categories) {
    const categorySelect = document.getElementById('expense-category');
    categorySelect.innerHTML = '';  // Clear previous options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.category1;
        categorySelect.appendChild(option);
    });
}

// Fetch incomes from API
async function fetchIncomes(userId) {
    console.log(userId)
    try {
        const response = await fetch(`https://zenny.azurewebsites.net/api/v1/movement/getIncomes/${userId}`);
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
    console.log(userId)
    try {
        const response = await fetch(`https://zenny.azurewebsites.net/api/v1/movement/getExpenses/${userId}`);
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
        const response = await fetch(`https://zenny.azurewebsites.net/api/v1/movement/getTotalIncomes/${userId}`);
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
        const response = await fetch(`https://zenny.azurewebsites.net/api/v1/movement/getTotalExpenses/${userId}`);
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
        const response = await fetch('https://zenny.azurewebsites.net/api/createMovement', {
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
    const table = document.getElementById("table-movements");
    table.innerHTML = '';  // Clear the current table content
    movements.forEach(movement => {
        let date = new Date(movement.movementDate)
        const row = document.createElement('tr');
        row.innerHTML = `
        <span class = "d-flex justify-content-between">
                <span class = "w-50 d-flex justify-content-between">
                    <span >${movement.concept}</span>
                    <span class = "me-5">${date.toLocaleDateString('es-ES')}</span>
                </span>

                <span class = "w-50 d-flex justify-content-between">        
                    <span>$${movement.value.toLocaleString('es-CO')}</span>
                    <span>
                        <button class="btn-edit" onclick="editMovement(${movement.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteMovement(${movement.id})">Delete</button>
                    </span>
                </span>
    
        </span>`;
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
            const response = await fetch(`https://zenny.azurewebsites.net/api/MovementUpdate/${id}`, {
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
            const response = await fetch(`https://zenny.azurewebsites.net/api/delete/${id}`, {
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


function showExpenseModal() {
    let newExpenseButton = document.getElementById("btn-agregar-gasto");
    newExpenseButton.addEventListener("click", () => {
        let modalExpense = new bootstrap.Modal(document.getElementById("addExpenseModal"));
        modalExpense.show();

        let category = document.getElementById("")
        let date = document.getElementById("income-date");
        let income = document.getElementById("income-value");

        let buttonSendIncome = document.getElementById("saveIncomeButton");
        let url = "https://zenny.azurewebsites.net/api/v1/createMovement";


        buttonSendIncome.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("hola");

            let userId = id;

            let newIncome = {
                "id": 0,
                "movementDate": date.value,
                "userId": userId,
                "value": income.value,
                "categoriesId": 9,
                "transactionTypesId": 1
            };

            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newIncome)
                });

                console.log(response.status);

                if (response.ok) {
                    // Opcional: Procesar la respuesta si es exitosa
                    const result = await response.json();
                    console.log('Ingreso creado:', result);
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                }

                // Cierra el modal después de guardar
                modalIncome.hide();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
}


function showIncomeModal() {
    let newIncomeButton = document.getElementById("btn-agregar-ingreso");
    newIncomeButton.addEventListener("click", () => {
        let modalIncome = new bootstrap.Modal(document.getElementById("addIncomeModal"));
        modalIncome.show();

        let date = document.getElementById("income-date");
        let income = document.getElementById("income-value");

        let buttonSendIncome = document.getElementById("saveIncomeButton");
        let url = "https://zenny.azurewebsites.net/api/v1/createMovement";


        buttonSendIncome.addEventListener("click", async (e) => {
            e.preventDefault();
            console.log("hola");

            let userId = id;

            let newIncome = {
                "id": 0,
                "movementDate": date.value,
                "userId": userId,
                "value": income.value,
                "categoriesId": 9,
                "transactionTypesId": 1
            };

            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newIncome)
                });

                console.log(response.status);

                if (response.ok) {
                    // Opcional: Procesar la respuesta si es exitosa
                    const result = await response.json();
                    console.log('Ingreso creado:', result);
                } else {
                    console.error('Error en la solicitud:', response.statusText);
                }

                // Cierra el modal después de guardar
                modalIncome.hide();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
}


// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    const userId = id;  // Replace with actual user ID
    showExpenseModal();
    showIncomeModal();
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
        userId: 123  // Replace with actual user ID
    };
    createMovement(movementData);
});
function guardian() {
    let verification = localStorage.getItem("access")
    if (verification !== "true") {
        window.location.href = "../views/login.html"
    }
}
