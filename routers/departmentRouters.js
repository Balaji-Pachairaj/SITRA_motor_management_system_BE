const express = require("express");

const Router = express.Router();

const departmemtControllers = require("../controllers/DepartmentControllers");

Router.post("/createdepartment", departmemtControllers?.createDepartement);

module.exports = Router;
