let boxPremium = document.getElementById("box-premium");
let boxBasic = document.getElementById("box-basic");

guardian()
boxBasic.addEventListener("click",function (e) {
    e.preventDefault();

    localStorage.setItem("plan","basic")
    localStorage.setItem("done","true")
    window.location.href = "../views/dashboard.html"
})

boxPremium.addEventListener("click",function (e) {
    e.preventDefault();

    localStorage.setItem("plan","premium")
    localStorage.setItem("done","true")
    window.location.href = "../views/payment.html"
})

function guardian() {
    let verification = localStorage.getItem("done")
    if (verification == "true") {
        window.location.href = "../views/dashboard.html"
    }
}
