//ORM
const { Sequelize } = require('sequelize');
//Connecction String.
const URI = `mysql://bsale_test:bsale_test@mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com:3306/bsale_test`;
//Connect to mySQL database
const sequelize = new Sequelize(URI, { dialect: 'mysql', logging: true });
//export module
module.exports = sequelize;
