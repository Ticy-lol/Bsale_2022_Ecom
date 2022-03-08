"use strict";

var items = document.getElementById("items");
var filters = document.getElementById("filters");
var inputField = document.getElementById("inputField");
var templateCard = document.getElementById("template-card").content;
var fragment = document.createDocumentFragment();
var filtersFemplateCard = document.getElementById("filters-template-card").content;
var searchButton = document.getElementById("search-button");
document.addEventListener("DOMContentLoaded", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getData();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
filters.addEventListener("click", function (e) {
  if (e.target.classList.contains("category")) {
    xd(e);
  }
});
searchButton.addEventListener("click", function (e) {
  var data = inputField.value;

  if (data == "") {} else {
    searchProducts(data);
    inputField.value = "";
  }
});

var searchProducts = function searchProducts(data) {
  var API, productsResponse, productsData, el;
  return regeneratorRuntime.async(function searchProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          API = "https://boiling-journey-27147.herokuapp.com/api/v1/products?data=" + data;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(API));

        case 3:
          productsResponse = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(productsResponse.json());

        case 6:
          productsData = _context2.sent;
          el = document.getElementById("items");
          el.innerHTML = "";

          if (productsData.length < 1) {
            el.innerHTML = "No hay coincidencias";
          } else {
            pintarProductsCards(productsData);
          }

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};

function getData() {
  var productsAPI, categoriesAPI, productsResponse, productsData, categoriesResponse, categoriesData;
  return regeneratorRuntime.async(function getData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productsAPI = "https://boiling-journey-27147.herokuapp.com/api/v1/products";
          categoriesAPI = "https://boiling-journey-27147.herokuapp.com/api/v1/categories";
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(fetch(productsAPI));

        case 5:
          productsResponse = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(productsResponse.json());

        case 8:
          productsData = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(fetch(categoriesAPI));

        case 11:
          categoriesResponse = _context3.sent;
          _context3.next = 14;
          return regeneratorRuntime.awrap(categoriesResponse.json());

        case 14:
          categoriesData = _context3.sent;
          pintarProductsCards(productsData);
          pintarCategoriesCard(categoriesData);
          items.innerHTML;
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](2);
          console.log(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 20]]);
}

var xd = function xd(e) {
  var el, id, categoriesAPI, categoriesResponse, categoriesData;
  return regeneratorRuntime.async(function xd$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          el = document.getElementById("items");
          el.innerHTML = "";
          id = e.target.parentElement.querySelector("a").dataset.id;
          categoriesAPI = "";

          if (id == -1) {
            categoriesAPI = "https://boiling-journey-27147.herokuapp.com/api/v1/products/";
          } else {
            categoriesAPI = "https://boiling-journey-27147.herokuapp.com/api/v1/products/category/" + id;
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(fetch(categoriesAPI));

        case 7:
          categoriesResponse = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(categoriesResponse.json());

        case 10:
          categoriesData = _context4.sent;
          pintarProductsCards(categoriesData);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var pintarCategoriesCard = function pintarCategoriesCard(data) {
  data.forEach(function (category) {
    filtersFemplateCard.querySelector("a").textContent = category.name;
    filtersFemplateCard.querySelector("a").dataset.id = category.id;
    var clone = filtersFemplateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  filtersFemplateCard.querySelector("a").textContent = "todos";
  filtersFemplateCard.querySelector("a").dataset.id = -1;
  var clone = filtersFemplateCard.cloneNode(true);
  fragment.appendChild(clone);
  filters.appendChild(fragment);
};

var pintarProductsCards = function pintarProductsCards(data) {
  data.forEach(function (product) {
    templateCard.querySelector("h5").textContent = product.name;
    templateCard.querySelector("p").textContent = "Precio: " + product.price;
    templateCard.querySelector("img").setAttribute("src", product.url_image);
    templateCard.querySelector("button").dataset.id = product.id;
    var clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);
};