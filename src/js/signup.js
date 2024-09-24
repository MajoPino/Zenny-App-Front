// import Swal from '/node_modules/sweetalert2/dist/sweetalert2.all.js';
import Swal from "sweetalert2";
import '@sweetalert2/theme-dark/dark.css'
// import 'sweetalert2/src/scss'

let form = document.getElementsByTagName('form');
let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password-2')

let nameVerification = false;
let lastNameVerification = false;
let emailVerification = false;
let passwordVerification = false;
let password2Verification = false;
let passwordsEquals = false;

let url = "https://zenny.azurewebsites.net/api/v1/User/Register"

guardian();
form[0].addEventListener('submit', function (e) {
    e.preventDefault();

    if (name.value == '') {
        name.classList.add('is-invalid');
        nameVerification = false;
    } else {
        name.classList.remove('is-invalid');
        nameVerification = true;
    }

    if (lastName.value === '') {
        lastName.classList.add('is-invalid');
        lastNameVerification = false;
    } else {
        lastName.classList.remove('is-invalid');
        lastNameVerification = true;
    }

    if (email.value === '') {
        email.classList.add('is-invalid');
        emailVerification = false;
    } else {
        email.classList.remove('is-invalid');
        emailVerification = true;
    }

    if (password.value === '') {
        password.classList.add('is-invalid');
        passwordVerification = false;
    } else {
        password.classList.remove('is-invalid');
        passwordVerification = true;
    }

    if (password2.value === '') {
        password2.classList.add('is-invalid');
        password2Verification = false;

    } else {
        password2.classList.remove('is-invalid');
        password2Verification = true;
    }

    if (password2.value !== password.value) {
        password2.classList.add('is-invalid');
        passwordsEquals = false;
    } else {
        password2.classList.remove('is-invalid');
        passwordsEquals = true;
    }

    if( nameVerification === true &&
        lastNameVerification === true &&
        emailVerification === true &&
        passwordVerification === true &&
        password2Verification === true &&
        passwordsEquals === true)
        {

verifyUserExistence(name,lastName,email,password)
        }            
            console.log(nameVerification)
            console.log(lastNameVerification)
            console.log(emailVerification)
            console.log(passwordVerification)
            console.log(password2Verification)
            console.log(passwordsEquals)
});

function guardian() {
    let verification = localStorage.getItem("access")
    if (verification == "true") {
        window.location.href = "../views/dashboard.html"
    }
}

async function verifyUserExistence(name, lastName, email, password) {

    try {

        let newUser = {
            "Name": name.value,
            "LastName": lastName.value,
            "Email": email.value,
            "Password": password.value,
            "SubscriptionTypesId": 1
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if (response.ok) {            
            localStorage.setItem("email",email.value )
            localStorage.setItem("access","true")
            Swal.fire({
                icon: 'success',
                title: '¡Buen trabajo!',
                text: 'Usuario registrado correctamente',
                showConfirmButton: false,
                timer: 3000
            }).then(()=>{
                window.location.href = "../views/dashboard.html"
            })


        }
        else if(response.status == 400)
            {
                Swal.fire({
                    icon: 'error',
                    title: 'El email ya esta en uso',
                    text: 'Por favor ingresa',
                });
                email.value = "";
            }

        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops... ¡Algo salio mal!',
                text: 'Intentalo de nuevo',
            });
        }

    } catch (error) {
        console.error
    }

}
