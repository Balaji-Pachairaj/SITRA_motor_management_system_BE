const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
     {
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
               minlength: 6,
          },
          username: {
               type: String,
          },

          admin: {
               type: String,
               enum: [
                    "milladmin",
                    "unitadmin",
                    "departmentadmin",
                    "sitraadmin",
                    "defaultadmin",
               ],
               default: "defaultadmin",
          },
          mill: { type: mongoose.Schema.ObjectId, ref: "Mill", default: null },
          unit: [],
          department: [],
     },
     { strict: false }
);

module.exports = mongoose.model("User", user);
