import { fetchData } from "./fetchData.js";

export async function renderList() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  try {
    const products = await fetchData(
      "https://ximenacamacho.github.io/entregafinalfront/data/articles.json"
    );

    const filtered = products.filter(
      (product) => product.category === category
    );

    const container = document.getElementById("products-container");
    const title = document.getElementById("category-title");
    if (title) title.textContent = `${capitalize(category)}`;

    if (filtered.length === 0) {
      container.innerHTML = `<p>No hay productos disponibles en esta categoría.</p>`;
      return;
    }

    filtered.forEach((product) => {
      const article = document.createElement("article");
      article.classList.add("product-card");
      article.innerHTML = `
    <a href="productDetail.html?id=${product.id}">
      <img class="product-card__image" src="${product.image}" alt="${
        product.name
      }" />
    </a>
    <h3 class="product-card__name">${product.name}</h3>
    <p class="product-card__price">$ ${product.price.toFixed(2)}</p>
    <p class="product-card__description">
      ${product.description} <a href="productDetail.html?id=${
        product.id
      }">Ver más</a>
    </p>
    <a class="product-card__button" href="productDetail.html?id=${
      product.id
    }">Detalles</a>
  `;
      container.appendChild(article);
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
