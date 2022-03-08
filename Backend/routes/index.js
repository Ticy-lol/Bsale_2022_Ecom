const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const express = require('express');
//This function controll all routes of the API
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);

  //The next lines give the chance to create differents versions of the API.

  /*app.use('/api/v2', router);
  router.use('/products', productsRouter);*/
}
//Export the function
module.exports = routerApi;
