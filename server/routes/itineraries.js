const express = require('express');
const Itinerary = require('../models/Itinerary');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const itinerary = new Itinerary({ ...req.body, organizer: req.user.userId });
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate('organizer', 'username');
    res.json(itineraries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/like', authMiddleware, async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    itinerary.likes += 1;
    await itinerary.save();
    res.json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    itinerary.comments.push({ userId: req.user.userId, text: req.body.text });
    await itinerary.save();
    res.json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/join', authMiddleware, async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (itinerary.participants.length >= itinerary.participantLimit) {
      return res.status(400).json({ error: 'Trip is full' });
    }
    if (!itinerary.participants.includes(req.user.userId)) {
      itinerary.participants.push(req.user.userId);
      await itinerary.save();
    }
    res.json(itinerary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;