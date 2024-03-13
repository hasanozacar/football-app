const mongoose = require('mongoose');

const mvpSchema = new mongoose.Schema({
  season: { type: String, required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
});

const MVP = mongoose.model('MVP', mvpSchema);

module.exports = MVP;
