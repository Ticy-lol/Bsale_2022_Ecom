const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

//This class is the logic behind of the API
class ProductsService {
  contructor() {}
  //Function return all products
  async getAllProducts() {
    const query = 'SELECT * FROM product ';
    const [data] = await sequelize.query(query);
    return data;
  }
  //Function return the product match with the id
  async findById(id) {
    const query = `SELECT * FROM product WHERE id=${id};`;
    const [data] = await sequelize.query(query);
    //If didnt find throw an error message and status code
    if (data.length == 0) {
      throw boom.notFound('Product not found');
    }
    return data;
  }
  //Function returns all the products that in their name have a match with the information give by the user
  async findByName(name) {
    const query = 'SELECT * FROM product ';
    let filtredData = [];
    const [data] = await sequelize.query(query);
    //Search all products matches
    for (let dataInformation of data) {
      //Add the product if have a match in the name
      if (dataInformation.name.toLowerCase().includes(name.toLowerCase())) {
        filtredData.push(dataInformation);
      }
    }
    return filtredData;
  }
  //Return all product by category id
  async findProductsByCategoryId(categoryId) {
    const query = `SELECT * FROM product WHERE category=${categoryId};`;
    const [data] = await sequelize.query(query);
    //If didnt find throw an error message and status code
    if (data.length == 0) {
      throw boom.notFound('Product not found');
    }
    return data;
  }
}
//Export the class
module.exports = ProductsService;
