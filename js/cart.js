let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function renderCart() {
  const cartContainer = document.querySelector("#asd");
  const resumen = document.querySelector(".cart__summary");

  if (!cartContainer || !resumen) {
    console.warn("No se encontró el contenedor del carrito o el resumen.");
    return;
  }

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.classList.add("empty__cart");
    cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    updateSummary();
    updateCartCounter();
    return;
  }

  cart.forEach((product) => {
    cartContainer.appendChild(createCartItem(product));
  });

  updateSummary();
  attachCartListeners();
  updateCartCounter();
}

function createCartItem(product) {
  const item = document.createElement("article");
  item.classList.add("cart__item");

  const finalPrice = (product.price * product.quantity).toFixed(2);

  item.innerHTML = `
    <img class="cart__item-image" src="${product.image}" alt="${
    product.name
  }" />
    <div class="cart__item-pricing">
      <h2 class="cart__item-name">${product.name}</h2>
      <p class="cart__item-price">$${product.price.toFixed(2)}</p>
    </div>
    <div class="cart__item-quantity">
      <input class="cart__input" type="number" min="1" value="${
        product.quantity
      }" data-id="${product.id}" />
    </div>
    <p class="cart__item-final-price">$${finalPrice}</p>
    <button type="button" class="cart__item-remove" data-id="${product.id}">
      <img src="./images/icon/trash.svg" alt="Eliminar" />
    </button>
  `;

  return item;
}

function updateSummary() {
  const resumen = document.querySelector(".cart__summary");
  if (!resumen) return;

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  resumen.querySelector(
    ".cart__summary-row:nth-child(1) .cart__summary-label"
  ).textContent = `${totalItems} artículo${totalItems !== 1 ? "s" : ""}`;

  resumen.querySelector(
    ".cart__summary-row:nth-child(1) .cart__summary-value"
  ).textContent = `$${totalPrice.toFixed(2)}`;

  resumen.querySelector(
    ".cart__summary-row:nth-child(2) .cart__summary-value"
  ).textContent = "$0.00";

  resumen.querySelector(
    ".cart__summary-row:nth-child(3) .cart__summary-value"
  ).textContent = `$${totalPrice.toFixed(2)}`;

  resumen.querySelector(".cart__summary-buy").disabled = cart.length === 0;
  resumen.querySelector(".cart__summary-clear").disabled = cart.length === 0;
}

function attachCartListeners() {
  document.querySelectorAll(".cart__input").forEach((input) => {
    input.addEventListener("change", (event) => {
      const id = event.target.dataset.id;
      const newQuantity = parseInt(event.target.value);
      const product = cart.find((p) => String(p.id) === id);

      if (product && newQuantity > 0) {
        product.quantity = newQuantity;
        saveCartAndRender();
      }
    });
  });

  document.querySelectorAll(".cart__item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      cart = cart.filter((p) => String(p.id) !== id);
      saveCartAndRender();
    });
  });

  document
    .querySelector(".cart__summary-clear")
    ?.addEventListener("click", () => {
      cart = [];
      showModal("¿Así nomás? ¡Vaciaste el carrito sin comprar nada!");
      saveCartAndRender();
    });

  document
    .querySelector(".cart__summary-buy")
    ?.addEventListener("click", () => {
      cart = [];
      localStorage.removeItem("cart");
      showModal("¡Compra realizada con éxito!");
      renderCart();
      updateCartCounter();
    });
}

function saveCartAndRender() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function showModal(message) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal__content">
      <p>${message}</p>
      <button class="modal__close">Cerrar</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal
    .querySelector(".modal__close")
    .addEventListener("click", () => modal.remove());
  setTimeout(() => modal.remove(), 1000);
}

export function updateCartCounter() {
  const cartCountElement = document.querySelector(".header__cart-count");
  if (!cartCountElement) return;

  const count = cart.reduce((sum, p) => sum + p.quantity, 0);
  cartCountElement.textContent = count;
  cartCountElement.style.display = count === 0 ? "none" : "inline-block";
}
