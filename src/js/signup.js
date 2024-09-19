let form = document.getElementsByTagName('form');
let name = document.getElementById('name');
let lastName = document.getElementById('lastname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password-2')
let erroMessage = document.getElementById('error-message')

let url = "https://zenny.azurewebsites.net/swagger/api/userCreate/createUser"


guardian();
form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    if (name.value === '') {
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

function guardian() {
    let verification = localStorage.getItem("access")
    if (verification == "true") {
        window.location.href = "./"
    }
}

async function verifyUserExistence(name,lastName,email,password,password2) {
    let response = await fetch(`${url}?email=${email.value}`)
    let data = await response.json()


    if (data.length === 1) {
        erroMessage.classList.add("is-invalid")
    }
    else {

        let newUser = {
            "id":0,
            "name":name.value,
            "lastName":lastName.value,
            "email": email.value,
            "password": password.value,
            "subscriptionTypesId":1
        }
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        localStorage.setItem("access", true)
        localStorage.setItem("email",email.value)
        window.location.href = "./"
    }

}