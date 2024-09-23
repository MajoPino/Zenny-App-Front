import Swal from './node_modules//sweetalert2/dist/sweetalert2.all.js';
import Swal from "sweetalert2"
import 'sweetalert2/src/scss'
import '@sweetalert2/theme-dark/dark.css'



let form = document.getElementsByTagName('form');
let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password-2')
let erroMessage = document.getElementById('error-message')

let url = "https://zenny.azurewebsites.net/api/v1/User/Register"


// guardian();
form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if (name.value == '') {
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }

    if (lastName.value === '') {
        lastName.classList.add('is-invalid');
    } else {
        lastName.classList.remove('is-invalid');
    }

    if (email.value === '') {
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }

    if (password.value === '') {
        password.classList.add('is-invalid');
    } else {
        password.classList.remove('is-invalid');
    }

    if (password2.value === '') {
        password2.classList.add('is-invalid');
    } else {
        password2.classList.remove('is-invalid');
    }

    verifyUserExistence(name,lastName,email,password,password2)
});

// function guardian() {
//     let verification = localStorage.getItem("access")
//     if (verification == "true") {
//         window.location.href = "./"
//     }
// }

async function verifyUserExistence(name,lastName,email,password,password2) {

        try{

            let newUser = {
                "Name":name.value,
                "LastName":lastName.value,
                "Email": email.value,
                "Password": password.value,
                "SubscriptionTypesId":1
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            if (response.ok)
            {
                Swal.fire({
                    icon: 'success',
                    title: '¡Buen trabajo!',
                    text: 'Usuario registrado correctamente',
                    showConfirmButton: false,
                    timer: 1900
                  });
                  
                window.location.href = "./Login.html"
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... ¡Algo salio mal!',
                    text: 'Intentalo de nuevo',
                  });
                console.log("Error en la solicitud: ", response.status);

            }
        }catch(error){
            console.error
        }
        
}
