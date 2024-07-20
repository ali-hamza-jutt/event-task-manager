const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');


router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    location: req.body.location,
    description: req.body.description,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', getEvent, (req, res) => {
  res.json(res.event);
});

router.put('/:id', getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }
  if (req.body.start != null) {
    res.event.start = req.body.start;
  }
  if (req.body.end != null) {
    res.event.end = req.body.end;
  }
  if (req.body.location != null) {
    res.event.location = req.body.location;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: 'Deleted event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Cannot find event' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.event = event;
  next();
}

module.exports = router;
