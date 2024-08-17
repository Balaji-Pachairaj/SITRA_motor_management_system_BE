const express = require("express");

const Routers = express.Router();

const unitControllers = require("../controllers/UnitControllers");

Routers.post("/createunitundermill", unitControllers?.createUnitUnderMill);

Routers.post("/addUnitAdmin", unitControllers?.addUnitAdmin);

Routers.get("/indivunit/:unitid", unitControllers?.indivUnit);

module.exports = Routers;
