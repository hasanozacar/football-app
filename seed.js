// seed.js
const Team = require('./models/teams');
const Player = require('./models/player');
const User = require('./models/user');
const Rating = require('./models/rating');
const MVP = require('./models/mvp');

const seedData = async () => {
  try {
    // Takımları oluştur
    const team1 = await Team.create({ name: 'Team A', country: 'Country A' });
    const team2 = await Team.create({ name: 'Team B', country: 'Country B' });

    // Oyuncuları oluştur ve takımlara bağla
    const player1 = await Player.create({ name: 'Player 1', position: 'Forward', team: team1._id });
    const player2 = await Player.create({ name: 'Player 2', position: 'Midfielder', team: team2._id });
    const player3 = await Player.create({ name: 'Player 3', position: 'Defender', team: team1._id });
    const player4 = await Player.create({ name: 'Player 4', position: 'Goalkeeper', team: team2._id });

    // Kullanıcıları oluştur
    const user1 = await User.create({ username: 'user1', email: 'user1@example.com', password: 'password1' });
    const user2 = await User.create({ username: 'user2', email: 'user2@example.com', password: 'password2' });

    // Ratingleri oluştur ve oyunculara, kullanıcılara bağla
    const rating1 = await Rating.create({ value: 4.5, player: player1._id, user: user1._id });
    const rating2 = await Rating.create({ value: 3.8, player: player2._id, user: user1._id });
    const rating3 = await Rating.create({ value: 4.2, player: player3._id, user: user2._id });

    // MVP'leri oluştur ve oyunculara bağla
    const mvp1 = await MVP.create({ season: '2023-2024', player: player1._id });
    const mvp2 = await MVP.create({ season: '2023-2024', player: player2._id });

    // Daha fazla veri ekleyin...

    console.log('Seed data added successfully.');
  } catch (error) {
    console.error('Error adding seed data:', error);
  }
};

module.exports = seedData;
