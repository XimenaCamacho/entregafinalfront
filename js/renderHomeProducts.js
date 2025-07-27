import { fetchData } from "./fetchData.js";

export async function renderHomeProducts() {
  try {
    const products = await fetchData(
      "https://ximenacamacho.github.io/entregafinalfront/data/articles.json"
    );

    // Categorías que querés mostrar y la clase CSS correspondiente para el contenedor
    const categories = [
      { name: "aromas", containerClass: ".index__products--aromas" },
      { name: "piedras", containerClass: ".index__products--piedras" },
      { name: "decoracion", containerClass: ".index__products--decoracion" },
      { name: "bijouterie", containerClass: ".index__products--bijouterie" },
      { name: "fuentes", containerClass: ".index__products--fuentes" },
    ];

    categories.forEach(({ name, containerClass }) => {
      const container = document.querySelector(
        `${containerClass} .index__products-list`
      );

      if (!container) {
        console.warn(
          `No se encontró el contenedor para la categoría "${name}"`
        );
        return;
      }

      // Filtrar productos por categoría
      const filtered = products.filter((product) => product.category == name);

      // Elegir 4 aleatorios (sin repetir)
      const randomProducts = getRandomItems(filtered, 4);

      // Limpiar container para cargar solo productos random
      container.innerHTML = "";

      // Renderizar cada producto
      randomProducts.forEach((product) => {
        const article = document.createElement("article");
        article.classList.add("product");
        article.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3 class="product__title">${product.name}</h3>
          <p">${product.description}</p>
        `;
        container.appendChild(article);
      });
    });
  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

// Función para tomar N items aleatorios sin repetir
function getRandomItems(arr, n) {
  const result = [];
  const usedIndexes = new Set();
  while (result.length < n && result.length < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!usedIndexes.has(idx)) {
      usedIndexes.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}
