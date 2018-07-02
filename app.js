var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");

var itemRouter = require("./routes/item");
var auth = require("./routes/auth");
var app = express();
var helmet = require("helmet");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(helmet());

var mongoose = require("mongoose");

var myConfig = require("./config/config.js");
mongoose.connect(
    myConfig.dbURL,
    { autoIndex: false }
);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/auth", auth);
app.use("/api/items", itemRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "frontend", "build", "index.html")
        );
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);

    if (req.app.get("env") !== "development") {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});
module.exports = app;
