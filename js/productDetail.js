import { fetchData } from "./fetchData.js";
import { updateCartCounter } from "./cart.js";
import { toggleFavorite, updateHeartIcon } from "./favs.js";

export async function productDetail() {
  const id = new URLSearchParams(window.location.search).get("id");
  const products = await fetchData("../data/articles.json");
  const product = products.find((p) => p.id?.toString() === id);

  if (!product) return;

  document.querySelector(".product-detail__image").src = product.image;
  document.querySelector(".product-detail__image").alt = product.name;
  document.querySelector(".product-detail__info h2").textContent = product.name;
  document.querySelector(
    ".product-detail__values p"
  ).textContent = `$ ${product.price.toFixed(2)}`;
  document.querySelector(
    ".product-detail__values p:nth-child(2)"
  ).textContent = `-${product.discount || 0}% desc`;
  document.querySelector(".product-detail__description p").textContent =
    product.description;

  updateHeartIcon(product.id);
  document
    .querySelector(".tooltip-container")
    ?.addEventListener("click", () => {
      toggleFavorite(product.id, product);
    });
}

// Modal de confirmación al agregar producto
function showAddToCartModal() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;

  modal.classList.remove("modal--hidden");

  setTimeout(() => {
    modal.classList.add("modal--hidden");
  }, 1000);
}

document.getElementById("closeModal")?.addEventListener("click", () => {
  document.getElementById("cartModal")?.classList.add("modal--hidden");
});

document.querySelector("#addToCart")?.addEventListener("click", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const quantity =
    parseInt(document.getElementById("number")?.textContent) || 1;

  const products = await fetchData("../data/articles.json");
  const product = products.find((p) => p.id?.toString() === id);
  if (!product) return;

  const productToAdd = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    quantity,
  };

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === productToAdd.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  showAddToCartModal();
});
