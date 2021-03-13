const mongoose = require("mongoose")

const TollSchema = new mongoose.Schema({
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
  
  module.exports = mongoose.model("Toll", TollSchema)
  