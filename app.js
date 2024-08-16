const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const authenticateRouters = require("./routers/authenticateRouters");

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
     res.write("Welcome to SITRA motor management project BE");
     res.end();
});

app.use(authenticateRouters);

// Starting the sever
mongoose
     .connect(
          "mongodb+srv://balajitheblankde:xy6FUcOlPbp5rf4i@cluster0.inim0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     )
     .then((result) => {
          console.log("DB Connected");
          app.listen(4000);
     })
     .catch((err) => {
          console.log("Connect failed");
     });
