const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  stasus: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
