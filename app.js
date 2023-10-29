/** @format */

const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = 5000;

app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send("OUR HOMEPAGE");
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
