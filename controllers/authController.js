const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı (signup) işlemi
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Kullanıcı var mı kontrol et
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Yeni kullanıcı oluştur
    const newUser = await User.create({ username, email, password });

    // Şifreli şifreyi geri döndürme
    newUser.password = undefined;

    // Token oluştur ve gönder
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Kullanıcı girişi (login) işlemi
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcı var mı kontrol et
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Şifreli şifreyi geri döndürme
    user.password = undefined;

    // Token oluştur ve gönder
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
