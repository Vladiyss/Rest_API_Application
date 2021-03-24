const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const db = require('./application/config/database');

const port = 8098;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const database = mongoose.connection;
database ? console.log("Connected to database") : console.log("Error while connecting to database");

const private_route = require('./application/route/private_route');
const public_route = require('./application/route/public_route');

app.use('/', public_route);
app.use('/', private_route);

app.listen(port, () => {
    console.log("Server is running on port " + port);
});