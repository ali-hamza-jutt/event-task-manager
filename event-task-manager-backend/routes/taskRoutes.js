const express = require('express');
const router = express.Router();
const Task = require('../models/task.js');


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    description: req.body.description,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', getTask, (req, res) => {
  res.json(res.task);
});


router.put('/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
  }
  if (req.body.priority != null) {
    res.task.priority = req.body.priority;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Deleted task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.task = task;
  next();
}

module.exports = router;
