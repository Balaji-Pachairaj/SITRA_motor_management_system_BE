const express = require("express");

const Routers = express.Router();

const authenticateControllers = require("../controllers/AuthenticateControllers");

Routers.post("/signup", authenticateControllers.signupController);

Routers.post("/signin", authenticateControllers.signinController);

Routers.get("/list/user", authenticateControllers?.getUserListController);

module.exports = Routers;
