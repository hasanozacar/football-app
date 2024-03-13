// app.js
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const teamsRouter = require('./routers/teams');
const authRouter = require('./routers/authRouter');
const seedData = require('./seed');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/football-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
seedData();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// teams router'ını kullan
app.use('/teams', teamsRouter);
// auth router'ını kullan
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
