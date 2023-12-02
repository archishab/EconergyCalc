const mongoose = require("mongoose");
const { Schema } = mongoose;

const usageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  appliance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appliances",
  },
  duration: Number, // in seconds
  energyConsumed: Number, // in kWh / year
  timestamp: Date,
});

module.exports = mongoose.model("usage", usageSchema);
