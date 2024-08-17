const express = require("express");

let millControllers = require("../controllers/MillControllers");

const Routers = express.Router();

Routers.post(
     "/createmillaccount",
     millControllers?.creeateMillAccountandmillAdmin
);

Routers.get("/list/millaccounts", millControllers?.listMillAccounts);

Routers.get("/indivmill/:millid", millControllers?.getIndivMillsAccount);

Routers.post("/addadminonmill", millControllers?.addAdminInMillAccount);

module.exports = Routers;
