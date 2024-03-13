// models/playerRating.js (Oyuncu Değerlendirme Modeli)
const mongoose = require('mongoose');

const playerRatingSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

const PlayerRating = mongoose.model('PlayerRating', playerRatingSchema);

module.exports = PlayerRating;
