const Department = require("../models/department");
const Mill = require("../models/mill");
const Unit = require("../models/unit");
const User = require("../models/userlogin");

const createDepartement = async (req, res, next) => {
     let body = req?.body;
     let unitid = body.unitid;
     let departmentinput = body?.department;
     try {
          if (!unitid.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid Mill ID format" });
          }

          let unitObj = await Unit.findById(unitid).populate("millid");

          if (!unitObj) {
               return res.status(400).json({ error: "UnitNotFound" });
          }

          let MillObj = await Mill.findById(unitObj?.millid._id);

          let departmentObj = new Department({
               name: departmentinput?.name,
               unit: unitObj?._id,
               mill: MillObj?._id,
          });

          await departmentObj?.save();

          await unitObj.addDepartment(departmentObj?._id);

          res.json({
               MillObj,
               unitObj,
               departmentObj,
          });
     } catch (e) {}
};

exports.createDepartement = createDepartement;
