// controllers/teamsController.js
const jwt = require("jsonwebtoken");
const Team = require("../models/teams");

// Kimlik doğrulama ve yetkilendirme middleware
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId; // Kullanıcının ID'sini talep objesine ekleyebilirsiniz
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Takım ekleme
exports.addTeam = async (req, res) => {
  // Kimlik doğrulama kontrolü
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name } = req.body;

  try {
    const team = new Team({ name });
    await team.save();

    res.json({ message: "Team added successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tüm takımları listeleme
exports.getAllTeams = async (req, res) => {
  // Kimlik doğrulama kontrolü
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const teams = await Team.find();
    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Belirli bir takımı getirme
exports.getTeamById = async (req, res) => {
  // Kimlik doğrulama kontrolü
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const teamId = req.params.teamId;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Maç ekleme
exports.addMatch = async (req, res) => {
  const { teamId } = req.params;
  const { opponent, result, date, stats } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    team.matches.push({ opponent, result, date, stats });
    await team.save();

    res.json({ message: "Match added successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Oyuncu ekleme
exports.addPlayer = async (req, res) => {
  const { teamId } = req.params;
  const { name, rating } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    team.players.push({ name, rating });
    await team.save();

    res.json({ message: "Player added successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Oyuncu rating güncelleme
exports.updatePlayerRating = async (req, res) => {
  const { teamId, playerId } = req.params;
  const { rating } = req.body;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const player = team.players.id(playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    player.rating = rating;
    await team.save();

    res.json({ message: "Player rating updated successfully", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Diğer işlevler

// Oyuncu rating'i için oy verme
exports.voteForPlayer = async (req, res) => {
  const { teamId, playerId, vote } = req.params;

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const player = team.players.id(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Oyuncuya oy verme
    player.rating = (player.rating * player.votes + parseInt(vote)) / (player.votes + 1);
    player.votes += 1;

    await team.save();

    res.json({ message: 'Vote submitted successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};