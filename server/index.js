require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const Admin = require('./models/Admin');
const Submission = require('./models/Submission');

const app = express();
app.use(cors({
  origin: 'https://highlightventures.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // Explicitly handle preflight requests
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT auth middleware
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Admin registration (run once, then remove or protect this route)
app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;
  const existing = await Admin.findOne({ username });
  if (existing) return res.status(400).json({ message: 'Admin already exists' });
  const hash = await bcrypt.hash(password, 10);
  await Admin.create({ username, password: hash });
  res.json({ message: 'Admin created' });
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Save submission and send email
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await Submission.create({ name, email, phone, message });
    res.status(200).json({ message: 'Request sent successfully!' });
  } catch (error) {
    console.error('CONTACT FORM ERROR:', error);
    res.status(500).json({ message: 'Failed to save submission', error: error.message });
  }
});

// Get all submissions (admin only)
app.get('/api/admin/submissions', auth, async (req, res) => {
  const submissions = await Submission.find().sort({ date: -1 });
  res.json(submissions);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT)); 