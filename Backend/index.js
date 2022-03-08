const express = require('express');
const routerApi = require('./routes/index');
const cors = require('cors');
const {
  logsErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
//Let to receive json data
app.use(express.json());
//Let use the API by other users/IP direcctions
app.use(cors());
//Use express
routerApi(app);
//Use and catch the errors
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => {
  //console.log('Mi port ' + port);
});
