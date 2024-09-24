let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementsByTagName("form");
let passwordMessage = document.getElementById("password-message");


let url =  "https://zenny.azurewebsites.net/api/v1/User/Login"

// guardian()
form[0].addEventListener("submit", async (event) => {

    event.preventDefault(); 
    if ( email.value == "") {
        email.classList.add("is-invalid")  
    }else{
        email.classList.remove("is-invalid")
    }

    if ( password.value == "" ) {
        password.classList.add("is-invalid")
    }else{
        password.classList.remove("is-invalid")
    }

    await verification(email,password);
})

async function verification(email,password) {

    try {
        let user = {
            "email":email.value,
            "password":password.value
        }
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(user),
        });        

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... ¡Algo salio mal!',
                text: 'Intentalo de nuevo',
              });
            const errorText = await response.text();
            throw new Error(`Error: ${response.status}, ${errorText}`);
           

        }else if (response.ok == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... ¡Algo salio mal!',
                text: 'Intentalo de nuevo',
              });
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Login successful:', data);
        guardian()
    } catch (error) {
        console.error('Error logging in:', error);
    }

}

function guardian() {
    localStorage.setItem("access", true)
    localStorage.setItem("email",email.value)
    localStorage.setItem("token",data.token)
    window.location.href = "./dashboard.html"
}
