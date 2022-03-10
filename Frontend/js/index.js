//Let create fragment
const fragment = document.createDocumentFragment();
//Get elements in the DOM by ID
const items = document.getElementById('items');
const filters = document.getElementById('filters');
const inputField = document.getElementById('inputField');
const templateCard = document.getElementById('template-card').content;
const filtersTemplateCard = document.getElementById(
  'filters-template-card'
).content;
const searchButton = document.getElementById('search-button');
//FUNCTIONS
//Fetch the API and return the json data
const fetchAPI = async (API) => {
  const response = await fetch(API);
  const data = await response.json();
  return data;
};
//Return the price before the discount
const priceBefore = function (price, discount) {
  let priceBeforeDiscount = Math.floor(price / (1 - discount / 100));
  return priceBeforeDiscount;
};
//Default content in the page
const getData = async () => {
  const productsAPI =
    'https://boiling-journey-27147.herokuapp.com/api/v1/products';
  const categoriesAPI =
    'https://boiling-journey-27147.herokuapp.com/api/v1/categories';
  try {
    const productsData = await fetchAPI(productsAPI);
    const categoriesData = await fetchAPI(categoriesAPI);
    //Print in the DOM body all products and categories in the page
    await printProductCards(productsData);
    await printCategoriesCards(categoriesData);
  } catch (error) {
    console.error(error);
  }
};
//Search the the product match with the data given by user
const searchProducts = async (data) => {
  const API =
    'https://boiling-journey-27147.herokuapp.com/api/v1/products?data=' + data;
  try {
    const productsData = await fetchAPI(API);
    const el = document.getElementById('items');
    //Clear the DOM body
    el.innerHTML = '';
    //Print in the DOM in case doesnt have matches
    if (productsData.length < 1) {
      el.innerHTML = 'No hay coincidencias';
    } else {
      //Print all matches products in the DOM
      printProductCards(productsData);
    }
  } catch (error) {
    console.error(error);
  }
};
//Print all categories in the DOM body
const printCategoriesCards = (data) => {
  data.forEach((category) => {
    //Find the template for categories and edit the data
    filtersTemplateCard.querySelector('a').textContent = category.name;
    filtersTemplateCard.querySelector('a').dataset.id = category.id;
    //Clone the template
    const clone = filtersTemplateCard.cloneNode(true);
    //Push the cloned template
    fragment.appendChild(clone);
  });
  //Add the filter to reset
  //Find the template for categories and edit the data
  filtersTemplateCard.querySelector('a').textContent = 'todos';
  filtersTemplateCard.querySelector('a').dataset.id = -1;
  let clone = filtersTemplateCard.cloneNode(true);
  fragment.appendChild(clone);
  //Submit all clones templates before in the DOM
  filters.appendChild(fragment);
};
//Print all products selected by category in the DOM body
const printFilteredProductsByCategory = async (e) => {
  try {
    const el = document.getElementById('items');
    //Clear the DOM body
    el.innerHTML = '';
    //Get data from the element
    const id = e.target.parentElement.querySelector('a').dataset.id;
    let categoriesAPI = '';
    //Set the API url
    if (id == -1) {
      categoriesAPI =
        'https://boiling-journey-27147.herokuapp.com/api/v1/products/';
    } else {
      categoriesAPI =
        'https://boiling-journey-27147.herokuapp.com/api/v1/products/category/' +
        id;
    }
    //Get all products matches
    const categoriesData = await fetchAPI(categoriesAPI);
    //Print all products
    printProductCards(categoriesData);
  } catch (error) {
    console.error(error);
  }
};
//Print all products given
const printProductCards = (data) => {
  data.forEach((product) => {
    //Set the product name
    templateCard.querySelector('h5').textContent = product.name;
    //Set the product price
    templateCard.getElementById('price-after-discount').textContent =
      '$' + product.price;
    //If doesnt existe discount in the product
    if (product.discount.toString() == '0') {
      //Set void data
      templateCard.getElementById('discount').textContent = '';
      //Set void data
      templateCard.getElementById('price-before-discount').textContent = '';
      //Remove the class discount
      templateCard.getElementById('discount').classList.remove('discount');
    } else {
      //Set the product discount
      templateCard.getElementById('discount').textContent =
        product.discount + '%';
      //Set the product price before discount
      templateCard.getElementById('price-before-discount').textContent =
        '$' + priceBefore(product.price, product.discount);
      //Add class discount to the html element
      templateCard.getElementById('discount').classList.add('discount');
    }
    //Set the img url
    templateCard.querySelector('img').setAttribute('src', product.url_image);
    //Set the product id in the button
    templateCard.querySelector('button').dataset.id = product.id;
    //Clone the template sets before
    const clone = templateCard.cloneNode(true);
    //Push the cloned template
    fragment.appendChild(clone);
  });
  //Print all the cloned templates pushed before
  items.appendChild(fragment);
};
//LISTENER EVENTS
//Listener for first load
(async function charge() {
  await getData();
})();
//Listener if user click in any category
filters.addEventListener('click', async (e) => {
  if (e.target.classList.contains('category')) {
    await printFilteredProductsByCategory(e);
  }
});
//Listener if user click on Buscar button
searchButton.addEventListener('click', async (e) => {
  const data = inputField.value;
  if (data == '') {
  } else {
    await searchProducts(data);
    //Clear the input field
    inputField.value = '';
  }
});
//Listener if user pess enter instead of the search button
inputField.addEventListener('keyup', async function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    const data = inputField.value;
    if (data == '') {
    } else {
      await searchProducts(data);
      //Clear the input field
      inputField.value = '';
    }
  }
});
