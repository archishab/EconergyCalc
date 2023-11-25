const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  upVote: {
    type: Number,
  },
  downVote: {
    type: Number, 
  },
  replies: [replySchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);