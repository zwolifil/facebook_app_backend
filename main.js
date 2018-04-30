const express = require('express');
const routes = require('./app/routes/routes');
const config = require('./app/config/config');

const app = express();
config(app);
routes(app);
app.listen(8000);
