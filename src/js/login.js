let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementsByTagName("form");
let passwordMessage = document.getElementById("password-message");

let verificationEmail = false;
let verificationPassword = false;

let url = "https://zenny.azurewebsites.net/api/v2/User/Login"

// guardian()
form[0].addEventListener("submit", async (event) => {

    event.preventDefault();
    if (email.value == "") {
        email.classList.add("is-invalid")
        verificationEmail = false;
    } else {
        email.classList.remove("is-invalid")
        verificationEmail = true;
    }

    if (password.value == "") {
        password.classList.add("is-invalid")
        verificationPassword = false;
    } else {
        password.classList.remove("is-invalid")
        verificationPassword = true;
    }
    if (verificationEmail === true && verificationPassword === true) {
        await verification(email, password);
    }

})

async function verification(email, password) {

    try {
        let user = {
            "email": email.value,
            "password": password.value
        }
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Usuario o contraseña invalidos',
                text: 'Intentalo de nuevo',
            });
            const errorText = await response.text();
            throw new Error(`Error: ${response.status}, ${errorText}`);


        } else if (response.ok == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... ¡Algo salio mal!',
                text: 'Intentalo de nuevo',
            });
            throw new Error(`Error: ${response.status}`);
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Bien hecho',
                text: 'Dirigiendo al dashboard',
                timer: 3000
            }).then(async() => {
                const data = await response.json();
                console.log('Login successful:', data);
                sendData(data)
            })

        }

    } catch (error) {
        console.error('Error logging in:', error);
    }

}

function sendData(data) {
    localStorage.setItem("access", true)
    localStorage.setItem("email", data.email)
    localStorage.setItem("token", data.token)
    localStorage.setItem("plan", data.subscription_type)
    localStorage.setItem("id", data.id)
    window.location.href = "../views/dashboard.html"
}
function guardian() {
    let verification = localStorage.getItem("access")
    if(verification ==="true")
    {
        window.location.href = "../views/dashboard.html"
    }
    if (verificaiton === "0") {
        window.location.href = "../views/userPlan.html"
    }
}