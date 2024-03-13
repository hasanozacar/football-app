const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
