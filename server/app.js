var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const middleWareRouter = require("./meddelware/authMiddlewere");
const usersSystemRouter = require("./routes/userSystem/userSystem");
const cardSystem = require("./routes/Cards/cardsRouter");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const cors = require("cors");
const morgan = require("morgan");

// require("./primeryData/primeryData");

mongoose
  .connect("mongodb://localhost:/dataToProjectGalxy")
  .then(() => console.log({ msg: "Db is connected" }))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan(":method :url :status :response-time ms"));

//app.use();

app.use("/user", usersSystemRouter);
app.use("/cards", middleWareRouter, cardSystem);
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
