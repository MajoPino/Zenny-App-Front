export function warden() {
    let tokenStroage= localStorage.getItem('token')
    if (tokenStroage === null) {
        window.location.href = "../../index.html"
    }
}
warden()