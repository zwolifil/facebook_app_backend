
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./app/routes/routes');
const config = require('./app/config/config');

const app = express();
app.use(bodyParser.json());
app.use(express.static("/home/filip/Projects/facebook-like-app/src/Images"));

config(app);
routes(app);
app.listen(8000);
