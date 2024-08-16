const User = require("../models/userlogin");

const signupController = async (req, res, next) => {
     let body = req.body;

     try {
          let email = body?.email;
          let password = body?.password;
          let username = body?.username;

          let userObj = new User({
               email: email,
               password: password,
               username: username,
               admin: "sitraadmin",
               mill: null,
               unit: null,
               department: null,
          });

          await userObj.save({ strict: false });

          res.status(201).json({
               isCreated: true,
               user: { ...userObj?._doc },
          });
     } catch (e) {
          if (e?.code === 11000) {
               res.status(400).json({
                    isCreated: false,
                    duplicateError: true,
                    keys: {
                         ...e.keyPattern,
                    },
               });
          } else {
               res.status(400).json({
                    isCreated: false,
                    message: e?.message,
               });
          }
     }
};

const signinController = async (req, res, next) => {
     let body = req.body;
     try {
          const user = await User.findOne({ email: body.email }).populate(
               "mill"
          );

          if (user) {
               if (user.password === body?.password) {
                    res.json({
                         isAuthenticated: true,
                         user,
                    });
               } else {
                    res.status(400).json({
                         isAuthenticated: false,
                         code: "unAuthenticatedAccess",
                         message: "Unauthorized access",
                    });
               }
          } else {
               res.status(404).json({
                    code: "UserNotFound",
                    error: "Email not found",
               });
          }
     } catch (e) {
          res.status(404).json({
               isAuthenticated: false,
               error: e,
          });
     }
};

const getUserListController = async (req, res, next) => {
     try {
          //   let list = await User.find().select("email password");
          let list = await User.find().select("username email");
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
          res.json({
               error: e?.message,
          });
     }
};

exports.getUserListController = getUserListController;
exports.signinController = signinController;
exports.signupController = signupController;
