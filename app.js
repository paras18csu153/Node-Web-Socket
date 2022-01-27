var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var WebSocketServer = require("ws");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const wss = new WebSocketServer.Server({ port: 8990 });

wss.on("connection", function connection(ws) {
  console.log("A User Appeared.");
  ws.send("Hey Why did you disturbed me??");
  ws.on("message", function message(data) {
    console.log("received: %s", data);
    ws.send(
      "Your message was received Successfully... You can leave for now!!"
    );
  });
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
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
