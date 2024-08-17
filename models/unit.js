const mongoose = require("mongoose");

const Schema = mongoose?.Schema;

const unit = new Schema(
     {
          name: {
               type: String,
          },
          location: {
               type: String,
          },

          millid: {
               type: Schema?.Types?.ObjectId,
               ref: "Mill",
          },

          admins: [
               {
                    type: Schema?.Types?.ObjectId,
                    ref: "User",
               },
          ],

          departments: [],
     },
     { strict: false }
);

unit.methods.addAdmins = function (userId) {
     this.admins.push(userId);
     return this.save();
};

module.exports = mongoose.model("Unit", unit);
