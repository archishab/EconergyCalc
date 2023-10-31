const mongoose = require("mongoose");

const applianceSchema = new Schema({
  applianceType: {
    type: String,
    required: true,
  },
  applianceName: {
    type: String,
    required: true,
  },
  powerRating: {
    type: Number,
    required: true,
  },
  usageDuration: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("notes", applianceSchema);
