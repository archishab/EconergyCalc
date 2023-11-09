const mongoose = require("mongoose");
const { Schema } = mongoose;

const usageLogSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number, // store duration in minutes
    required: true,
  }
});

const applianceSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
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
  active: {
    type: Boolean,
    required: true,
  },
  usageLogs: [usageLogSchema] // Array of usage logs
});

module.exports = mongoose.model("appliances", applianceSchema);
