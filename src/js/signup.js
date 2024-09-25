
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
        lastName.classList.remove('is-invalid');
        lastNameVerification = true;
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

    if (nameVerification === true &&
        lastNameVerification === true &&
        emailVerification === true &&
        passwordVerification === true &&
        password2Verification === true &&
        passwordsEquals === true) {

        verifyUserExistence(name, lastName, email, password)
    }
});


function verifyUserExistence(name, lastName, email, password) {
    localStorage.setItem("email", email.value)
    localStorage.setItem("name",name.value)
    localStorage.setItem("lastName",lastName.value)
    localStorage.setItem("password",password.value)
    localStorage.setItem("access", "0")
    Swal.fire({
        icon: 'success',
        title: '¡Buen trabajo!',
        text: 'Usuario registrado correctamente',
        showConfirmButton: false,
        timer: 3000
    }).then(() => {
        window.location.href = "../views/userPlan.html"
    })

}
