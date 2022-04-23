require('dotenv').config();
import express from "express";  // express is used for routing pages
import configViewEngine from "./configs/viewEngine"; // view engine for ejs
import initWebRoutes from "./routes/web"; 
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";
import fileUpload from "express-fileupload";
// import multer from "multer";

let app = express();

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());


//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());



// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
console.log('Hello from server.js!');
app.listen(port, () => console.log(`Server is running on port ${port}!`));