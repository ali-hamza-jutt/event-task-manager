
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String },
  description: { type: String },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
