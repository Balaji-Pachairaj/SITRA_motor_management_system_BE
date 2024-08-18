const mongoose = require("mongoose");

const Schema = mongoose?.Schema;

const department = new Schema({
     name: {
          type: String,
     },
     mill: {
          type: Schema?.Types?.ObjectId,
          ref: "Mill",
     },
     unit: {
          type: Schema?.Types?.ObjectId,
          ref: "Unit",
     },
     admins: [
          {
               type: Schema?.Types?.ObjectId,
               ref: "User",
          },
     ],
});

module.exports = mongoose.model("Department", department);
