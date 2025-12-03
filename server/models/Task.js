const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    subtasks: [subtaskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
