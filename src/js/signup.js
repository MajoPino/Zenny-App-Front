document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtiene los campos del formulario
    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    let valid = true;

    // Validación del nombre
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('is-invalid');
        valid = false;
    } else {
        nameInput.classList.remove('is-invalid');
    }

    // Validación del apellido
    if (lastnameInput.value.trim() === '') {
        lastnameInput.classList.add('is-invalid');
        valid = false;
    } else {
        lastnameInput.classList.remove('is-invalid');
    }

    // Validación del email
    if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        valid = false;
    } else {
        emailInput.classList.remove('is-invalid');
    }

    // Validación de la contraseña
    if (passwordInput.value.trim() === '') {
        passwordInput.classList.add('is-invalid');
        valid = false;
    } else {
        passwordInput.classList.remove('is-invalid');
    }

    // Validación de la confirmación de la contraseña
    if (confirmPasswordInput.value.trim() === '' || confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordInput.classList.add('is-invalid');
        valid = false;
    } else {
        confirmPasswordInput.classList.remove('is-invalid');
    }

    // Si todos los campos son válidos, conecta con el API
    if (valid) {
        const newUser = {
            name: nameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        // Conectar al API simulada de JSONPlaceholder
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Cuenta creada exitosamente:', data);
                alert('¡Cuenta creada exitosamente!');
                // Redireccionar a la página de login después del éxito
                window.location.href = '/src/views/Login.html';
            })
            .catch(error => {
                console.error('Error al crear la cuenta:', error);
                alert('Ocurrió un error al crear la cuenta.');
            });
    }
});

// Función para validar el formato del email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
