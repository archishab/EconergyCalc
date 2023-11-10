const mongoose = require("mongoose");
const { Schema } = mongoose;

const usageSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  appliance:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appliances'
  },
  duration: Number, // in seconds
  energyConsumed: Number, // in kWh
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("usage", usageSchema);
