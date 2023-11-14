/** @format */

const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = 5000;

app.use(morgan("dev"));
app.set("view engine", "ejs")
// app.get("/", function (req, res) {
//   res.send("OUR HOMEPAGE");
// });


app.get('/', (req, res) =>{
  var student = [
    { Name: 'cindy', email: 'cindy@gmail.com'},
    { Name: 'peter', email: 'peter@gmail.com'}
  ]
  res.render('pages/index', {
    students : student
  })
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
