const Unit = require("../models/unit");
const Mill = require("../models/mill");
const User = require("../models/userlogin");

const createUnitUnderMill = async (req, res, next) => {
     let body = req.body;
     let millid = body?.millid;
     let unitBody = body?.unit;

     // Body Format
     // mill id
     // unit details -> name , location

     try {
          // Is millid vaildate and existing

          if (!millid.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid Mill ID format" });
          }

          let millAccount = await Mill.findById(millid);

          if (!millAccount) {
               res.status(404).json({
                    error: "MillNotFound",
               });
          }

          let unitAccount = new Unit({
               name: unitBody?.name,
               location: unitBody?.location,
               millid: millAccount._id,
               admins: [],
               departments: [],
          });

          await unitAccount.save();

          await millAccount?.addUnit(unitAccount?._id);

          res.status(201).json(unitAccount);
     } catch (e) {
          res.status(400).json({
               e,
               message: e?.message,
          });
     }
};

const addUnitAdmin = async (req, res, next) => {
     let body = req?.body;
     let user = body?.user;
     let unitId = body?.unitid;
     try {
          if (!unitId.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid Mill ID format" });
          }

          let unitObj = await Unit.findById(unitId).populate({
               path: "millid",
          });

          if (!unitObj) {
               res.status(404).json({
                    error: "UnitNotFound",
               });
          }

          if (!unitObj?.millid?._id) {
               res.status(404).json({
                    error: "MillNotFound",
               });
          }

          let userObj = new User({
               username: user?.username,
               email: user?.email,
               password: user?.password,
               admin: "unitadmin",
               units: [],
               departments: [],
               mill: unitObj?.millid?._id,
          });

          await userObj.save();

          await unitObj?.addAdmins(userObj._id);

          await userObj?.addUnit(unitObj?._id);
          res.status(201).json({
               userObj,
               unitObj,
          });
     } catch (e) {
          res.status(400).json({
               e,
               message: e?.message,
          });
     }
};

const indivUnit = async (req, res, next) => {
     let unitid = req.params.unitid;

     try {
          if (!unitid.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid UNIT ID format" });
          }

          let unitObj = await Unit.findById(unitid)
               .populate({
                    path: "millid",
               })
               .populate({
                    path: "admins",
                    model: "User",
               })
               .populate({
                    path: "departments",
                    model: "Department",
               });

          if (!unitObj) {
               res.status(404).json({
                    error: "UnitNotFound",
               });
          }

          res.json(unitObj);
     } catch (e) {
          res.status(400).json({
               e,
               message: e?.message,
          });
     }
};

exports.indivUnit = indivUnit;
exports.addUnitAdmin = addUnitAdmin;
exports.createUnitUnderMill = createUnitUnderMill;
