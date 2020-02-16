require("dotenv").config();

const hbs = require("hbs");
const flash = require("connect-flash");

// Database
require("./configs/mongoose.config");
// Debugger
require('./configs/debugger.config')
// App
const express = require("express");
const app = express();
// Middleware Setup
require('./configs/middleware.config')(app)
// Express View engine setup
require('./configs/preformatter.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

app.use(flash());
require("./passport")(app);

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

module.exports = app;
