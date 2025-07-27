export function uiHandlers() {
  //== Efecto login/register ==
  const btnSignIn = document.getElementById("sign-in");
  const btnSignUp = document.getElementById("sign-up");
  const formRegister = document.querySelector(".form__layout-register");
  const formLogin = document.querySelector(".form__layout-login");

  if (btnSignIn && btnSignUp) {
    btnSignIn.addEventListener("click", () => {
      formRegister.classList.add("form__layout-hide");
      formLogin.classList.remove("form__layout-hide");
    });

    btnSignUp.addEventListener("click", () => {
      formRegister.classList.remove("form__layout-hide");
      formLogin.classList.add("form__layout-hide");
    });
  }

  //== Modal login/register ==
  const loginBtn = document.getElementById("loginBtn");
  const modal = document.getElementById("auth-modal");
  const closeModal = document.getElementById("close-modal");

  if (loginBtn && modal && closeModal) {
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
  }

  //== Contador productDetail ==
  const number = document.getElementById("number");
  const minus = document.getElementById("minus");
  const plus = document.getElementById("plus");

  let count = 1;

  function updateUI() {
    if (number) number.textContent = count;
    if (minus) minus.disabled = count === 1;
  }

  if (minus && plus && number) {
    minus.addEventListener("click", () => {
      if (count > 1) {
        count--;
        updateUI();
      }
    });

    plus.addEventListener("click", () => {
      count++;
      updateUI();
    });

    updateUI();
  }

  //== Toggle menú hamburguesa ==
  window.toggleMenu = function (el) {
    el.classList.toggle("active");
    document.querySelector("aside.mobile-menu")?.classList.toggle("active");
  };
}
