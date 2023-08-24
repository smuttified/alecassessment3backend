
//Initialise a new ExpressJS application
const express = require('express');
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const mongoose = require('mongoose');
const cors = require("cors");
const instance = express();
const mongoStore = require('connect-mongo');
const port = 443;
const connectionString = "mongodb+srv://smuttified:9oborTQUqlOw0CsT@alec.0exvoj9.mongodb.net/alec";

exports.instance = instance;
exports.mongoose = mongoose;

instance.set('trust proxy', 1);
instance.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
instance.use(bodyParser.urlencoded({ extended: true }));
instance.use(bodyParser.json());
instance.use(expressSession({
    secret: "9oborTQUqlOw0CsT",
    store: mongoStore.create({ mongoUrl: connectionString }),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

exports.start = async function () {
    mongoose.connection.on("open", function () {
        instance.use(cors({ origin: true, credentials: true }));
        instance.listen(port, function () {
            console.log("Listening to port " + port);
        });
    });

    await mongoose.connect(connectionString);
};