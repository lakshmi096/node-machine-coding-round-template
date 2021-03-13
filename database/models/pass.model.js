const mongoose = require("mongoose")

const PassSchema = new mongoose.Schema({
    _tollId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Toll"
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    usageLimit: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    validHours: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    charge: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    isUnlimited: {
      type: mongoose.Schema.Types.Boolean,
      required: true,
    },
    _vehicleType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "vehicleType"
    },
  
  }, { timestamps: true, versionKey: false })
  
  module.exports = mongoose.model("Pass", PassSchema)
  