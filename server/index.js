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
const allowedOrigins = [
  'https://highlightventures.in',
  'https://www.highlightventures.in',
  'https://highlightventures.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

// --- EMAIL NOTIFICATION SETUP ---
// To use Gmail for notifications:
// 1. Go to https://myaccount.google.com/apppasswords
// 2. Generate an App Password for 'Mail' (if you have 2FA enabled)
// 3. Set NOTIFY_EMAIL to your Gmail, NOTIFY_EMAIL_PASS to the app password in your environment variables
// 4. Redeploy your backend
//
// If Gmail fails, fallback to Ethereal for testing (emails will not be delivered to real inbox, but you get a preview URL in logs)

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await Submission.create({ name, email, phone, message });

    // Respond to the frontend immediately
    res.status(200).json({ message: 'Request sent successfully!' });

    // Send email in the background (non-blocking)
    setImmediate(async () => {
      try {
        if (!process.env.NOTIFY_EMAIL || !process.env.NOTIFY_EMAIL_PASS) {
          console.error('Email credentials not set in environment variables.');
          return;
        }
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.NOTIFY_EMAIL,
            pass: process.env.NOTIFY_EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.NOTIFY_EMAIL,
          to: process.env.NOTIFY_EMAIL,
          subject: 'New Lead from Highlight Ventures',
          text: `You have received a new lead:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nSubmitted at: ${new Date().toLocaleString()}`
        });
        console.log('Notification email sent successfully.');
      } catch (emailError) {
        console.error('GMAIL EMAIL SEND ERROR (background):', emailError);
      }
    });
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