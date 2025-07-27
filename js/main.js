import { uiHandlers } from "./uiHandlers.js";
import { renderHomeProducts } from "./renderHomeProducts.js";
import { renderList } from "./renderList.js";
import { productDetail } from "./productDetail.js";
import { renderCart, updateCartCounter } from "./cart.js";
import { handleFavorites, renderFavorites } from "./favs.js";
import { renderSearchResults } from "./searchResult.js";

document.addEventListener("DOMContentLoaded", () => {
  uiHandlers();
  renderHomeProducts();
  renderList();
  productDetail();
  renderCart();
  updateCartCounter();
  if (document.querySelector("#favBtn")) {
    handleFavorites();
  }
  if (document.getElementById("favoritesList")) {
    renderFavorites();
  }
  if (document.getElementById("search-results-container")) {
    renderSearchResults();
  }
});
