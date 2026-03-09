const express = require('express');
const config = require('./config/config');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/', routes);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
});