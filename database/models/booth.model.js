const mongoose = require("mongoose")

const BoothSchema = new mongoose.Schema({
    _tollId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Toll"
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.String,
      default: null
    },
    description: {
      type: mongoose.Schema.Types.String,
      default: null
    },
  
  }, { timestamps: true, versionKey: false })
  
  module.exports = mongoose.model("Booth", BoothSchema)
  