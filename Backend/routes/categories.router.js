const express = require('express');
const CategoriesService = require('../services/categories.service');

const router = express.Router();
const service = new CategoriesService();
//These functions only control the routes and not the logic
//This route API (example: http://localhost:3000/api/v1/categories) return all the categories
router.get('/', async (req, res, next) => {
  try {
    res.send(await service.getAllCategories());
  } catch (error) {
    //Send the error to the error handlers
    next(error);
  }
});
//This route API (example: http://localhost:3000/api/v1/categories/5) return a category filtred by id only
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
//Export these routes
module.exports = router;
