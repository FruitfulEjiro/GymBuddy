/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
require("dotenv").config();
const connectDB = require("./config/DB");
const bcrypt = require("bcrypt");

const PORT = 5000;
const app = express();
const saltRounds = 10; // Number of characters

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Function to hash a password
const hashPassword = async (password) => {
  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

MONGODB_URI = process.env.string;
connectDB();

app.post("/signup", async (req, res) => {
  try {
    //   SIGNUP
    if (req.body.signupForm) {
      const userName = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const userEmail = email;

      // Select the database and collection
      const db = client.db("GymBuddy");
      const collection = db.collection("students");

      // Query the database to check if the user exists
      const user = await collection.findOne({ email: userEmail });
      console.log(user);

      if (user) {
        console.log(`User with email ${userEmail} exists in the database.`);
        return;
      } else {
        try {
          //  Call function to Hash Password
          const hashedPassword = hashPassword(password);
          console.log(hashedPassword);
          //  Create User in DB
          const student = await User.create({
            username: userName,
            email: email,
            password: hashedPassword,
          });
          console.log(student);
        } catch (err) {
          console.log(err);
          return;
        }

        res.redirect("/login");
        console.log(
          `User with email ${userEmail} does not exist in the database.`
        );
      }
    } else if (req.body.loginForm) {
      //   LOGIN
      const user = await collection.findOne({ email: userEmail });

      try {
        if (user && (await bcrypt.compare(password, student.password))) {
          res.redirect("/");
        } else {
          console.log("Login failed Check username and Password");
        }
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      res.send("Invalid request.");
    }
  } finally {
    // Close the connection to the MongoDB server
    await client.close();
  }
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
