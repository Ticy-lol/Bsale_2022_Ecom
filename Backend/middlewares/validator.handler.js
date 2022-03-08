const boom = require('@hapi/boom');
//This function is a validator using a schema
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    //Catch all the errors regarding the validations schema
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      //Send the error to the error handlers
      next(boom.badRequest(error));
    }
    //Go next step if doesnt have any error
    next();
  };
}
//Export the function
module.exports = validatorHandler;
