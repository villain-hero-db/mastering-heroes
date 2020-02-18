require("dotenv").config();

const hbs = require("hbs");
const flash = require("connect-flash");
const path = require("path")

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

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
require('./configs/views.config')(app)
require('./configs/locals.config')(app)
//Spotify
require('./configs/spotify.config')

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
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/files.routes"));





module.exports = app;
