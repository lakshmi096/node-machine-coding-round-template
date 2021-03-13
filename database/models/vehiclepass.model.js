const mongoose = require("mongoose")

const VehiclePassSchema = new mongoose.Schema({
    _tollId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Toll"
    },
    _boothId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Booth"
    },
    _passId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Pass"
    },
    regNo: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    charge: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    usageLimit: {
      type: mongoose.Schema.Types.Number,
      default: null,
      required: false,
    },
    isUnlimited: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
    crossedTollNumber: {
      type: mongoose.Schema.Types.Number,
      default: 0,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: false,
      default: null
    },
  
  }, { timestamps: true, versionKey: false })
  
  module.exports = mongoose.model("VehiclePass", VehiclePassSchema)
  