document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }) 
        });

        if (response.ok) {
            const data = await response.json();

            localStorage.setItem('token', data.token);

            window.location.href = '/index.html';
        } else {
            const errorData = await response.json();
            document.getElementById('error-message').innerText = errorData.message || 'Error al iniciar sesión';
        }
    } catch (error) {
        document.getElementById('error-message').innerText = 'Error de conexión. Intenta de nuevo más tarde.';
        console.error('Error al conectarse a la API:', error);
    }
});
