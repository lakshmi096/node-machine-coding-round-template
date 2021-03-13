const mongoose = require("mongoose")

const VehicleTypeSchema = new mongoose.Schema({
    type: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  }, { timestamps: true, versionKey: false })
  
  module.exports = mongoose.model("VehicleType", VehicleTypeSchema)
  