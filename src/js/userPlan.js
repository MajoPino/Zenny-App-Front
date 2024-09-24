let boxPremium = document.getElementById("box-premium");
let boxBasic = document.getElementById("box-basic");
let url = "https://zenny.azurewebsites.net/api/v1/User/Register"

guardian()
boxBasic.addEventListener("click",async function (e) {
    e.preventDefault();
    localStorage.setItem("access","1")
    let user = {
        "id":0,
        "Name": localStorage.getItem("name"),
        "lastName": localStorage.getItem("lastName"),
        "email": localStorage.getItem("email"),
        "password":localStorage.getItem("password"),
        "subscriptionTypesId":"1"
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    localStorage.removeItem("name")
    localStorage.removeItem("lastName")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    window.location.href = "../views/Login.html"
})


boxPremium.addEventListener("click",function (e) {
    e.preventDefault();
    
    localStorage.setItem("access","2")
    window.location.href = "../views/payment.html"
})

function guardian() {
    let verification = localStorage.getItem("access")

    if(verification !== "0")
    {
        window.location.href = "../../index.html"
    }
}
