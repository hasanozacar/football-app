// models/team.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  rating: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
});

const matchStatsSchema = new mongoose.Schema({
  possession: Number,
  shots: Number,
  goals: Number,
});

const matchSchema = new mongoose.Schema({
  opponent: String,
  result: String,
  date: Date,
  stats: matchStatsSchema,
});

const teamSchema = new mongoose.Schema({
  name: String,
  players: [playerSchema],
  matches: [matchSchema],
  mvp: {
    player: String,
    reason: String,
  },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
