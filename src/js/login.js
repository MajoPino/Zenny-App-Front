let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementsByTagName("form");
let passwordMessage = document.getElementById("password-message");


let url = "enpoint for the database";

guardian()
form[0].addEventListener("submit", async (event) => {

    event.preventDefault();
    await verification();
})

async function verification() {
    // let response = await fetch('${url}?email =${email.value}');
    // let data = await response.json();

    if (email.value === "" ) {
        email.classList.add("is-invalid")
    }

    else if (email.value !== "") { email.classList.remove("is-invalid") }

    if (password.value === "" ) { password.classList.add("is-invalid") }

    else if (password.value !== "") { password.classList.remove("is-invalid") }

    if (data.length === 1 && pasword.value == data[0].password) {
        localStorage.setItem("access", true)
        window.location.href = "./"
    }
    else {
        errormessage.classList.add("is-invalid")
    }
}

function guardian() {
    let verification = localStorage.getItem("access");
    if (verification == "true") {
        window.location.href = "./"
    }
}