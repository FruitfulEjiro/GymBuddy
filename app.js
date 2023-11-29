/** @format */

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/userModel");

const PORT = 5001;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//connect to database: replace <username> and <password> with you username and password
const MONGODB_URI =
  "mongodb+srv://<username>:<password>@cluster0.sn4b3rz.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
    console.log("cant connect to Database");
  });


app.post("/", async (req, res) => {
  var userName = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // Create a student
  try {
    const student = await User.create({
      username: userName,
      email: email,
      Password: password,
    });
  } catch (err) {
    console.log(err);
    return;
  }

  res.redirect("/success");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/why", (req, res) => {
  res.render("why");
});

app.get("/trainer", (req, res) => {
  res.render("trainer");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/login", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signin");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.listen(PORT);
console.log(`server is listening on PORT ${PORT}`);
