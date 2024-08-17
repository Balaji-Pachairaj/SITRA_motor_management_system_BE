const Mill = require("../models/mill");
const User = require("../models/userlogin");

const creeateMillAccountandmillAdmin = async (req, res, next) => {
     let body = req.body;
     let mill = body.mill;
     let user = body.user;

     console.log(body);
     try {
          let millObj = new Mill({
               name: mill.name,
               location: mill.location,
               status: "inboarding",
               admins: [],
          });

          await millObj.save();

          let userObj = new User({
               email: user.email,
               password: user?.password,
               username: user?.username,
               admin: "milladmin",
               //    mill: null,
               unit: [],
               department: [],
          });

          await userObj?.save();

          await millObj?.addAdmin(userObj?._id);

          userObj.mill = millObj?._id;
          await userObj.save();

          res.status(200).json({
               millObj,
               userObj,
          });
     } catch (e) {
          res.status(400).json({
               e: e.message,
               e,
          });
     }
};

const listMillAccounts = async (req, res, next) => {
     try {
          let list = await Mill.find().populate({
               path: "admins",
               select: "username email _id admin",
          });

          if (list) {
               res.json({
                    list,
               });
          } else {
               res.json({
                    list: [],
               });
          }
     } catch (e) {
          res.status(400).json({
               e,
               error: e.message,
          });
     }
};

const getIndivMillsAccount = async (req, res, next) => {
     try {
          let millid = req.params.millid;

          if (!millid.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid Mill ID format" });
          }

          let millAccount = await Mill.findById(millid).populate({
               path: "admins",
               select: "username email _id admin",
          });

          if (millAccount) {
               res.json(millAccount);
          } else {
               res.status(404).json({
                    error: "MillNotFound",
                    message: "Searched mill is not found in DB",
               });
          }
     } catch (e) {
          res.status(400).json({
               e,
               error: e.message,
          });
     }
};

const addAdminInMillAccount = async (req, res, next) => {
     let body = req?.body;
     let user = body?.user;
     let millid = body?.millid;
     try {
          if (!millid.match(/^[0-9a-fA-F]{24}$/)) {
               return res.status(400).json({ error: "Invalid Mill ID format" });
          }

          let millAccount = await Mill.findById(millid);

          if (!millAccount) {
               res.status(404).json({
                    error: "MillNotFound",
                    message: "Searched mill is not found in DB",
               });
          }

          let userObj = new User({
               email: user?.email,
               password: user?.password,
               username: user?.username,
               admin: "milladmin",
               mill: millAccount._id,
               unit: [],
               department: [],
          });

          await userObj.save();

          await millAccount?.addAdmin(userObj?._id);

          res.json(userObj);
     } catch (e) {
          res.json({
               error: e,
          });
     }
};

exports.addAdminInMillAccount = addAdminInMillAccount;
exports.getIndivMillsAccount = getIndivMillsAccount;
exports.creeateMillAccountandmillAdmin = creeateMillAccountandmillAdmin;
exports.listMillAccounts = listMillAccounts;
