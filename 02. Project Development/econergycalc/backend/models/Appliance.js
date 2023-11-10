const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  }
});

module.exports = mongoose.model("appliances", applianceSchema);
