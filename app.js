/** @format */

const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = 5000;

app.use(morgan("dev"));
app.set("view engine", "ejs");
// app.get("/", function (req, res) {
//   res.send("OUR HOMEPAGE");
// });
app.get("/", function (req, res) {
  var student = [
    { name: "Cindy", email: "cindy@gmail.com" },
    { name: "Peter", email: "peter@gmail.com" },
  ];
  res.render("pages/index", {
    students: student,
  });
});

app.get("/About", function (req, res) {
  res.render("pages/About");
});

app.get("/contact", function (req, res) {
  res.render("pages/contact");
});

app.get("/login", function (req, res) {
  res.render("pages/login");
});

app.get("/sigin", function (req, res) {
  res.render("pages/sigin");
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
