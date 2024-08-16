const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const authenticateRouters = require("./routers/authenticateRouters");

app.use(
     cors({
          origin: "*", // Replace with your client's origin
          methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS", "PUT"], // Allowed HTTP methods
          credentials: true, // Allow credentials (cookies, authorization headers, etc.)
     })
);

app.use(bodyParser.json());
app.use(authenticateRouters);

// Starting the sever
mongoose
     .connect(
          "mongodb+srv://balajitheblankde:xy6FUcOlPbp5rf4i@cluster0.inim0.mongodb.net/sitra?retryWrites=true&w=majority&appName=Cluster0"
     )
     .then((result) => {
          console.log("DB Connected");
          app.listen(4000);
     })
     .catch((err) => {
          console.log("Connect failed");
     });
