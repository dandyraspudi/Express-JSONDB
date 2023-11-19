const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');
const cors = require('cors');

// create our express app
const app = express()

// cors
app.use(cors({origin: '*'}))

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// route
const routes = require('./src/routes/routes');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));