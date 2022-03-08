"use strict";

//Let create fragment
var fragment = document.createDocumentFragment(); //Get elements in the DOM by ID

var items = document.getElementById('items');
var filters = document.getElementById('filters');
var inputField = document.getElementById('inputField');
var templateCard = document.getElementById('template-card').content;
var filtersTemplateCard = document.getElementById('filters-template-card').content;
var searchButton = document.getElementById('search-button'); //FUNCTIONS
//Fetch the API and return the json data

var fetchAPI = function fetchAPI(API) {
  var response, data;
  return regeneratorRuntime.async(function fetchAPI$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(API));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Return the price before the discount


var priceBefore = function priceBefore(price, discount) {
  var priceBeforeDiscount = Math.floor(price / (1 - discount / 100));
  return priceBeforeDiscount;
}; //Default content in the page


var getData = function getData() {
  var productsAPI, categoriesAPI, productsData, categoriesData;
  return regeneratorRuntime.async(function getData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productsAPI = 'https://boiling-journey-27147.herokuapp.com/api/v1/products';
          categoriesAPI = 'https://boiling-journey-27147.herokuapp.com/api/v1/categories';
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetchAPI(productsAPI));

        case 5:
          productsData = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(fetchAPI(categoriesAPI));

        case 8:
          categoriesData = _context2.sent;
          //Print in the DOM body all products and categories in the page
          printProductCards(productsData);
          printCategoriesCards(categoriesData);
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          console.error(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 13]]);
}; //Search the the product match with the data given by user


var searchProducts = function searchProducts(data) {
  var API, productsData, el;
  return regeneratorRuntime.async(function searchProducts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          API = 'https://boiling-journey-27147.herokuapp.com/api/v1/products?data=' + data;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetchAPI(API));

        case 4:
          productsData = _context3.sent;
          el = document.getElementById('items'); //Clear the DOM body

          el.innerHTML = ''; //Print in the DOM in case doesnt have matches

          if (productsData.length < 1) {
            el.innerHTML = 'No hay coincidencias';
          } else {
            //Print all matches products in the DOM
            printProductCards(productsData);
          }

          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
}; //Print all categories in the DOM body


var printCategoriesCards = function printCategoriesCards(data) {
  data.forEach(function (category) {
    //Find the template for categories and edit the data
    filtersTemplateCard.querySelector('a').textContent = category.name;
    filtersTemplateCard.querySelector('a').dataset.id = category.id; //Clone the template

    var clone = filtersTemplateCard.cloneNode(true); //Push the cloned template

    fragment.appendChild(clone);
  }); //Add the filter to reset
  //Find the template for categories and edit the data

  filtersTemplateCard.querySelector('a').textContent = 'todos';
  filtersTemplateCard.querySelector('a').dataset.id = -1;
  var clone = filtersTemplateCard.cloneNode(true);
  fragment.appendChild(clone); //Submit all clones templates before in the DOM

  filters.appendChild(fragment);
}; //Print all products selected by category in the DOM body


var printFilteredProductsByCategory = function printFilteredProductsByCategory(e) {
  var el, id, categoriesAPI, categoriesData;
  return regeneratorRuntime.async(function printFilteredProductsByCategory$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          el = document.getElementById('items'); //Clear the DOM body

          el.innerHTML = ''; //Get data from the element

          id = e.target.parentElement.querySelector('a').dataset.id;
          categoriesAPI = ''; //Set the API url

          if (id == -1) {
            categoriesAPI = 'https://boiling-journey-27147.herokuapp.com/api/v1/products/';
          } else {
            categoriesAPI = 'https://boiling-journey-27147.herokuapp.com/api/v1/products/category/' + id;
          } //Get all products matches


          _context4.next = 8;
          return regeneratorRuntime.awrap(fetchAPI(categoriesAPI));

        case 8:
          categoriesData = _context4.sent;
          //Print all products
          printProductCards(categoriesData);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; //Print all products given


var printProductCards = function printProductCards(data) {
  data.forEach(function (product) {
    //Set the product name
    templateCard.querySelector('h5').textContent = product.name; //Set the product price

    templateCard.getElementById('price-after-discount').textContent = '$' + product.price; //If doesnt existe discount in the product

    if (product.discount.toString() == '0') {
      //Set void data
      templateCard.getElementById('discount').textContent = ''; //Set void data

      templateCard.getElementById('price-before-discount').textContent = ''; //Remove the class discount

      templateCard.getElementById('discount').classList.remove('discount');
    } else {
      //Set the product discount
      templateCard.getElementById('discount').textContent = product.discount + '%'; //Set the product price before discount

      templateCard.getElementById('price-before-discount').textContent = '$' + priceBefore(product.price, product.discount); //Add class discount to the html element

      templateCard.getElementById('discount').classList.add('discount');
    } //Set the img url


    templateCard.querySelector('img').setAttribute('src', product.url_image); //Set the product id in the button

    templateCard.querySelector('button').dataset.id = product.id; //Clone the template sets before

    var clone = templateCard.cloneNode(true); //Push the cloned template

    fragment.appendChild(clone);
  }); //Print all the cloned templates pushed before

  items.appendChild(fragment);
}; //LISTENER EVENTS
//Listener for first load


document.addEventListener('DOMContentLoaded', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          getData();

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Listener if user click in any category

filters.addEventListener('click', function (e) {
  if (e.target.classList.contains('category')) {
    printFilteredProductsByCategory(e);
  }
}); //Listener if user click on Buscar button

searchButton.addEventListener('click', function (e) {
  var data = inputField.value;

  if (data == '') {} else {
    searchProducts(data); //Clear the input field

    inputField.value = '';
  }
});