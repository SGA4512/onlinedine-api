const express = require("express");
const config = require("config");
bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

require("./start/cors")(app);
require("./start/routes")(app);
require("./start/db")();

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;