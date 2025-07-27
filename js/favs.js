export function toggleFavorite(id, product) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some((fav) => fav.id.toString() === id.toString());

  if (exists) {
    favorites = favorites.filter((fav) => fav.id.toString() !== id.toString());
    showTooltip("Eliminado de favoritos");
  } else {
    favorites.push(product);
    showTooltip("Agregado a favoritos");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  console.log("Favoritos actuales en storage:", favorites);
  updateHeartIcon(id);
}

// Verifica si un producto está en favoritos
export function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((fav) => fav.id.toString() === id.toString());
}

// Actualiza el ícono del corazón y tooltip según si está o no en favoritos
export function updateHeartIcon(id) {
  const heartIcon = document.querySelector("#favBtn i");
  const tooltip = document.querySelector("#favBtn .tooltip");

  if (!heartIcon || !tooltip) return;

  if (isFavorite(id)) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    tooltip.textContent = "Quitar de favoritos";
  } else {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
    tooltip.textContent = "Agregar a favoritos";
  }
}

// Muestra el tooltip animado temporalmente
function showTooltip(text) {
  const tooltip = document.querySelector("#favBtn .tooltip");
  if (!tooltip) return;

  tooltip.textContent = text;
  tooltip.classList.add("tooltip--visible");

  setTimeout(() => {
    tooltip.classList.remove("tooltip--visible");
    updateHeartIconFromDOM();
  }, 1000);
}

// Restaura el ícono desde el DOM
function updateHeartIconFromDOM() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (id) updateHeartIcon(id);
}

// Lógica para usar en productDetail.html
export async function handleFavorites() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return;

  const products = await fetch(
    "https://ximenacamacho.github.io/entregafinalfront/data/articles.json"
  ).then((res) => res.json());
  const product = products.find((p) => p.id?.toString() === id);
  if (!product) return;

  const heartBtn = document.querySelector("#favBtn");
  if (!heartBtn) return;

  updateHeartIcon(product.id);

  heartBtn.addEventListener("click", () => {
    toggleFavorite(product.id, product);
  });
}

// Renderiza la lista de favoritos en favorites.html
export function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const container = document.getElementById("favoritesList");
  if (!container) return;

  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = `<p class="favs-text" >No tenés favoritos aún.</p>`;
    return;
  }

  favorites.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <a href="productDetail.html?id=${product.id}">
      <img class="product-card__image" src="${product.image}" alt="${product.name}" />
    </a>
    <h3 class="product-card__name">${product.name}</h3>
      <button class="remove-fav" data-id="${product.id}">Eliminar</button>
      </a>
    `;

    container.appendChild(productCard);
  });

  container.querySelectorAll(".remove-fav").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeFavorite(id);
    })
  );
}

// Elimina un producto de favoritos y actualiza la vista
function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.id.toString() !== id.toString());
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}
