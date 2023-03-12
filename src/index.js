require("dotenv").config()
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore= require("express-mysql-session");
const { database } = require("./keys");

const app = express();

// Settings
app.set("port", process.env.LPORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// Midlewares
app.use(session({
    secret: "fdcmysql",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash("success");      
        console.log(app.locals.success);
    next()
});



// Routes
app.use(require("./routes"));
app.use(require("./routes/index"));
app.use("/links", require("./routes/links"));

//Public
app.use(express.static(path.join(__dirname, "public")));


// Start server
app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en http://localhost:${app.get("port")}`);
});