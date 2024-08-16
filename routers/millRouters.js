const express = require("express");

let millControllers = require("../controllers/MillControllers");

const Routers = express.Router();

Routers.post(
     "/createmillaccount",
     millControllers?.creeateMillAccountandmillAdmin
);

Routers.get("/list/millaccounts", millControllers?.listMillAccounts);

module.exports = Routers;
