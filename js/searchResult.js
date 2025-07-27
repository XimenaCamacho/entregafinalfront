import { fetchData } from "./fetchData.js";

export async function renderSearchResults() {
  const searchTerm = getSearchTerm();
  const queryLabel = document.getElementById("search-query");
  const resultsContainer = document.getElementById("search-results-container");
  const jsonPath =
    "https://ximenacamacho.github.io/entregafinalfront/data/articles.json";

  queryLabel.textContent = searchTerm || "—";

  if (!searchTerm) {
    renderMessage("No se recibió ninguna búsqueda 😕", resultsContainer);
    return;
  }

  try {
    const products = await fetchData(jsonPath);
    const results = filterProducts(products, searchTerm);

    if (results.length > 0) {
      resultsContainer.innerHTML = renderProductCards(results);
    } else {
      renderMessage(
        `No se encontraron productos para "<strong>${searchTerm}</strong>" 😞`,
        resultsContainer
      );
    }
  } catch (err) {
    renderMessage(`Error técnico: ${err.message}`, resultsContainer);
  }
}

function getSearchTerm() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search")?.trim().toLowerCase();
}

function filterProducts(products, term) {
  return products.filter((product) => {
    const content = `${product.name} ${
      product.description
    } ${product.tags?.join(" ")}`.toLowerCase();
    return content.includes(term);
  });
}

function renderProductCards(products) {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product-card");

    article.innerHTML = `
      <a href="./productDetail.html?id=${product.id}">
        <img class="product-card__image" src="${product.image}" alt="${product.name}" />
      </a>
      <h3 class="product-card__name">${product.name}</h3>
      <a class="product-card__button" href="./productDetail.html?id=${product.id}">
        Detalles
      </a>
    `;

    fragment.appendChild(article);
  });

  const container = document.createElement("div");
  container.appendChild(fragment);
  return container.innerHTML;
}

function renderMessage(message, container) {
  container.innerHTML = `<p>${message}</p>`;
}
