const express = require('express');
const ProductsService = require('../services/products.service');

const router = express.Router();
const service = new ProductsService();
//These functions only control the routes and not the logic
//This route API (example: http://localhost:3000/api/v1/products/) return all the products
router.get('/', async (req, res, next) => {
  try {
    const { data } = req.query;
    if (!data) {
      res.send(await service.getAllProducts());
    } else {
      res.send(await service.findByName(data));
    }
  } catch (error) {
    //Send the error to the error handlers
    next(error);
  }
});
//This route API (example: http://localhost:3000/api/v1/products/5) return a products filtred by id only
//if the user give that param
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await service.findById(id));
  } catch (error) {
    //Send the error to the error handlers
    next(error);
  }
});
//This route API (example: http://localhost:3000/api/v1/products/category/2) return all products filtred by category id
router.get('/category/:catogryId', async (req, res, next) => {
  const { catogryId } = req.params;
  if (!catogryId) {
    res.status(404).send('Not found');
  }
  try {
    res.send(await service.findProductsByCategoryId(catogryId));
  } catch (error) {
    //Send the error to the error handlers
    next(error);
  }
});
//Export these routes
module.exports = router;
