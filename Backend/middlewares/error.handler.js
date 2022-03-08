//All these functions are error handlers. These function let catch the errors and log the errors in the console.
//these functions let the chance catch the errors and send to any server

//Catch the error and log the error in the console and send the error to the next error handler
function logsErrors(err, req, res, next) {
  console.error(err);
  next(err);
}
//Catch the error, send the status code and json with the stack error
function errorHandler(err, req, res, next) {
  res.status(500).json({ message: err.message, stack: err.stack });
}
//This is a function to handler error created by @hapi/boom library, thats better because can use dinamic statuc code
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
//Export all functions
module.exports = { logsErrors, errorHandler, boomErrorHandler };
