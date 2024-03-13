// routes/teams.js
const express = require('express');
const router = express.Router();
const Team = require('../models/teams');
const teamsController = require('../controllers/teamsControler');

// Takım ekleme endpoint'i
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const team = new Team({ name });
    await team.save();

    res.json({ message: 'Team added successfully', team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Tüm takımları listeleme endpoint'i
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Oyuncu rating'i için oy verme
router.post('/:teamId/players/:playerId/vote/:vote', teamsController.voteForPlayer);

// ... Diğer rotalar

module.exports = router;
