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