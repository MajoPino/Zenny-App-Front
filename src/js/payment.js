const buttons = document.querySelectorAll('.image');
let pay = document.getElementById("pay-button");

let url = "https://zenny.azurewebsites.net/api/v2/User/Register"


guardian()
pay.addEventListener("click",async function(){
    let user = {
        "id":0,
        "Name": localStorage.getItem("name"),
        "lastName": localStorage.getItem("lastName"),
        "email": localStorage.getItem("email"),
        "password":localStorage.getItem("password"),
        "subscriptionTypesId":"2"
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    localStorage.setItem(pay,"true")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
    localStorage.removeItem("lastName")
    localStorage.removeItem("password")
    localStorage.removeItem("access")

    window.location.href = "../views/Login.html"
})

function guardian() {
    let verification = localStorage.getItem("access")

    if(verification ==="true")
    {
        window.location.href = "../views/dashboard.html"
    }
    if(verification !== "0")
    {
        window.location.href = "../../index.html"
    }
    
}
// Agrega el evento de clic a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Quita la clase de todos los botones
        buttons.forEach(btn => btn.classList.remove('active-border'));
        // Agrega la clase solo al botón que fue clicado
        this.classList.add('active-border');
    });
});