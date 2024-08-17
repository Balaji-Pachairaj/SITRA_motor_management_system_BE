const mongoose = require("mongoose");

const Schema = mongoose?.Schema;

const Mill = new Schema(
     {
          name: {
               type: String,
               required: true,
               unique: false,
          },
          location: {
               type: String,
               required: true,
          },

          status: {
               type: String,
               enum: ["active", "inactive", "inboarding"],
               default: "inboarding",
          },

          admins: [
               {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: false,
               },
          ],

          units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
     },
     { strict: false }
);

Mill.methods.addAdmin = function (adminId) {
     this.admins.push(adminId);
     return this.save();
};

Mill.methods.addUnit = function (unitId) {
     this.units = this.units ? this.units : [];
     this.units.push(unitId);
     return this.save();
};
module.exports = mongoose.model("Mill", Mill);
