//== Efecto de poner login sobre register y viceversa ==//
const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const formRegister = document.querySelector(".form__layout-register");
const formLogin = document.querySelector(".form__layout-login");

btnSignIn.addEventListener("click", (e) => {
    formRegister.classList.add("form__layout-hide");
    formLogin.classList.remove("form__layout-hide");
});
btnSignUp.addEventListener("click", (e) => {
    formRegister.classList.remove("form__layout-hide");
    formLogin.classList.add("form__layout-hide");
});
//== Modal del login y register ==//
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("auth-modal");
const closeModal = document.getElementById("close-modal");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
});
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
});
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
//contador de productos en productDetail//
const number = document.getElementById("number");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

let count = 1;

function updateUI() {
    number.textContent = count;
  // Desactiva el botón si count es 1
    minus.disabled = count === 1;
}
minus.addEventListener("click", () => {
    if (count > 1) {
        count--;
        number.textContent = count;
        updateUI();
    }
});
plus.addEventListener("click", () => {
    count++;
    number.textContent = count;
    updateUI();
});
updateUI();