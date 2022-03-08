const items = document.getElementById("items");
const filters = document.getElementById("filters");
const inputField = document.getElementById("inputField");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const filtersFemplateCard = document.getElementById(
  "filters-template-card"
).content;
const searchButton = document.getElementById("search-button");
document.addEventListener("DOMContentLoaded", async () => {
  getData();
});
filters.addEventListener("click", (e) => {
  if (e.target.classList.contains("category")) {
    xd(e);
  }
});
searchButton.addEventListener("click", (e) => {
  const data = inputField.value;
  if (data == "") {
  } else {
    searchProducts(data);
    inputField.value = "";
  }
});
const searchProducts = async (data) => {
  const API =
    "https://boiling-journey-27147.herokuapp.com/api/v1/products?data=" + data;
  const productsResponse = await fetch(API);
  const productsData = await productsResponse.json();
  const el = document.getElementById("items");
  el.innerHTML = "";
  if (productsData.length < 1) {
    el.innerHTML = "No hay coincidencias";
  } else {
    pintarProductsCards(productsData);
  }
};

async function getData() {
  const productsAPI =
    "https://boiling-journey-27147.herokuapp.com/api/v1/products";
  const categoriesAPI =
    "https://boiling-journey-27147.herokuapp.com/api/v1/categories";
  try {
    const productsResponse = await fetch(productsAPI);
    const productsData = await productsResponse.json();
    const categoriesResponse = await fetch(categoriesAPI);
    const categoriesData = await categoriesResponse.json();
    pintarProductsCards(productsData);
    pintarCategoriesCard(categoriesData);
    items.innerHTML;
  } catch (error) {
    console.log(error);
  }
}
const xd = async (e) => {
  const el = document.getElementById("items");
  el.innerHTML = "";
  const id = e.target.parentElement.querySelector("a").dataset.id;
  let categoriesAPI = "";
  if (id == -1) {
    categoriesAPI =
      "https://boiling-journey-27147.herokuapp.com/api/v1/products/";
  } else {
    categoriesAPI =
      "https://boiling-journey-27147.herokuapp.com/api/v1/products/category/" +
      id;
  }
  const categoriesResponse = await fetch(categoriesAPI);
  const categoriesData = await categoriesResponse.json();
  pintarProductsCards(categoriesData);
};
const pintarCategoriesCard = (data) => {
  data.forEach((category) => {
    filtersFemplateCard.querySelector("a").textContent = category.name;
    filtersFemplateCard.querySelector("a").dataset.id = category.id;
    const clone = filtersFemplateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  filtersFemplateCard.querySelector("a").textContent = "todos";
  filtersFemplateCard.querySelector("a").dataset.id = -1;
  const clone = filtersFemplateCard.cloneNode(true);
  fragment.appendChild(clone);
  filters.appendChild(fragment);
};

const pintarProductsCards = (data) => {
  data.forEach((product) => {
    templateCard.querySelector("h5").textContent = product.name;
    templateCard.querySelector("p").textContent = "Precio: " + product.price;
    templateCard.querySelector("img").setAttribute("src", product.url_image);
    templateCard.querySelector("button").dataset.id = product.id;
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};
