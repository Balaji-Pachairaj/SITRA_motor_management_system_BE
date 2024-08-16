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

exports.creeateMillAccountandmillAdmin = creeateMillAccountandmillAdmin;
exports.listMillAccounts = listMillAccounts;
