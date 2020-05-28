require('dotenv').config();
var express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');
const URI="mongodb+srv://dbUser:dbUser@cluster0-4z5sn.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI,{useUnifiedTopology: true ,useNewUrlParser: true})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err));

const userRoute = require("./routes/users");
const bookRoute = require("./routes/books");
const transactionRoute = require("./routes/transactions");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile");
const cartRoute=require('./routes/cart.route');

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware=require('./middlewares/session.middleware');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_S));
app.use(sessionMiddleware);
//connectDB();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.cookie("hoang", 123);
  res.render("index");
});

var count = 0;
function cookieCount(req, res, next) {
  count++;
  console.log(req.cookies, ":", count);
  next();
}

app.use("/books", cookieCount,bookRoute);
app.use("/users", cookieCount, authMiddleware.requireAuth, userRoute);
app.use(
  "/transactions",
  cookieCount,
  authMiddleware.requireAuth,
  transactionRoute
);
app.use("/profile",authMiddleware.requireAuth,profileRoute);
app.use("/auth", authRoute);
app.use('/cart',cartRoute);
app.use(express.static("public"));

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
