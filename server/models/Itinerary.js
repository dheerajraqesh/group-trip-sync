const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  dates: { type: String, required: true },
  participantLimit: { type: Number, required: true },
  vibeTags: [{ type: String }],
  description: { type: String, required: true },
  budget: { type: String },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likes: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Itinerary', itinerarySchema);