const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

//This class is the logic behind of the API
class CategoriesService {
  contructor() {}
  //Function return all categories
  async getAllCategories() {
    const query = 'SELECT * FROM category ';
    const [data] = await sequelize.query(query);
    return data;
  }
  async findById(id) {
    //Function return the category match with the id
    const query = `SELECT * FROM category WHERE id=${id};`;
    const [data] = await sequelize.query(query);
    //If didnt find throw an error message and status code
    if (data.length == 0) {
      throw boom.notFound('Category not found');
    }
    return data;
  }
}
//Export the class
module.exports = CategoriesService;
