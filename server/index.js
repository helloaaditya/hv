require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');

const Admin = require('./models/Admin');
const Submission = require('./models/Submission');
const Testimonial = require('./models/Testimonial');
const Service = require('./models/Service');
const HomepageContent = require('./models/HomepageContent');
const ContactDetails = require('./models/ContactDetails');
const ProjectPhoto = require('./models/ProjectPhoto');

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
// Option 1: Gmail with App Password (requires 2FA enabled)
// 1. Enable 2-Factor Authentication: https://myaccount.google.com/security
// 2. Generate App Password: https://myaccount.google.com/apppasswords
// 3. Set NOTIFY_EMAIL and NOTIFY_EMAIL_PASS in environment variables
//
// Option 2: Gmail with OAuth2 (more secure, no app password needed)
// 1. Set up OAuth2 credentials in Google Cloud Console
// 2. Set NOTIFY_EMAIL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
//
// Option 3: Other email providers (Outlook, Yahoo, etc.)
// Update the transporter configuration below

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await Submission.create({ name, email, phone, message });

    // Respond to the frontend immediately
    res.status(200).json({ message: 'Request sent successfully!' });

    // Send email in the background (non-blocking)
    setImmediate(async () => {
      try {
        let transporter;
        
        // Option 1: Gmail with App Password
        if (process.env.NOTIFY_EMAIL && process.env.NOTIFY_EMAIL_PASS) {
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.NOTIFY_EMAIL,
              pass: process.env.NOTIFY_EMAIL_PASS
            }
          });
        }
        // Option 2: Gmail with OAuth2
        else if (process.env.NOTIFY_EMAIL && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.NOTIFY_EMAIL,
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
              accessToken: null
            }
          });
        }
        // Option 3: Outlook/Hotmail
        else if (process.env.NOTIFY_EMAIL && process.env.NOTIFY_EMAIL_PASS) {
          transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: process.env.NOTIFY_EMAIL,
              pass: process.env.NOTIFY_EMAIL_PASS
            }
          });
        }
        // Option 4: Yahoo
        else if (process.env.NOTIFY_EMAIL && process.env.NOTIFY_EMAIL_PASS) {
          transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
              user: process.env.NOTIFY_EMAIL,
              pass: process.env.NOTIFY_EMAIL_PASS
            }
          });
        }
        else {
          console.error('Email credentials not set in environment variables.');
          return;
        }

        await transporter.sendMail({
          from: process.env.NOTIFY_EMAIL,
          to: process.env.NOTIFY_EMAIL,
          subject: 'New Lead from Highlight Ventures',
          text: `You have received a new lead:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nSubmitted at: ${new Date().toLocaleString()}`
        });
        console.log('Notification email sent successfully.');
      } catch (emailError) {
        console.error('EMAIL SEND ERROR (background):', emailError);
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

// Testimonial routes
// Submit a new testimonial
app.post('/api/testimonials', async (req, res) => {
  try {
    const { name, email, role, rating, content, image } = req.body;
    
    // Validate required fields
    if (!name || !email || !role || !content) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }
    
    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const testimonial = await Testimonial.create({
      name,
      email,
      role,
      rating,
      content,
      image: image || ''
    });
    
    res.status(201).json({ 
      message: 'Testimonial submitted successfully! It will be reviewed by our team.',
      testimonial 
    });
  } catch (error) {
    console.error('Testimonial submission error:', error);
    res.status(500).json({ message: 'Failed to submit testimonial', error: error.message });
  }
});

// Get approved testimonials (public)
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ date: -1 })
      .limit(10); // Limit to 10 most recent approved testimonials
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
});

// Get all testimonials (admin only)
app.get('/api/admin/testimonials', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ date: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Get admin testimonials error:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
});

// Approve/reject testimonial (admin only)
app.put('/api/admin/testimonials/:id', auth, async (req, res) => {
  try {
    const { isApproved } = req.body;
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ 
      message: `Testimonial ${isApproved ? 'approved' : 'rejected'} successfully`,
      testimonial 
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Failed to update testimonial', error: error.message });
  }
});

// Delete testimonial (admin only)
app.delete('/api/admin/testimonials/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
  }
});

// Bulk delete testimonials (admin only)
app.delete('/api/admin/testimonials/bulk', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid IDs provided' });
    }
    
    const result = await Testimonial.deleteMany({ _id: { $in: ids } });
    
    res.json({ 
      message: `${result.deletedCount} testimonial(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Bulk delete testimonials error:', error);
    res.status(500).json({ message: 'Failed to delete testimonials', error: error.message });
  }
});

// Delete all testimonials (admin only)
app.delete('/api/admin/testimonials/all', auth, async (req, res) => {
  try {
    const result = await Testimonial.deleteMany({});
    
    res.json({ 
      message: `${result.deletedCount} testimonial(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete all testimonials error:', error);
    res.status(500).json({ message: 'Failed to delete testimonials', error: error.message });
  }
});

// Bulk delete submissions (admin only)
app.delete('/api/admin/submissions/bulk', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid IDs provided' });
    }
    
    const result = await Submission.deleteMany({ _id: { $in: ids } });
    
    res.json({ 
      message: `${result.deletedCount} submission(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Bulk delete submissions error:', error);
    res.status(500).json({ message: 'Failed to delete submissions', error: error.message });
  }
});

// Delete all submissions (admin only)
app.delete('/api/admin/submissions/all', auth, async (req, res) => {
  try {
    const result = await Submission.deleteMany({});
    
    res.json({ 
      message: `${result.deletedCount} submission(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete all submissions error:', error);
    res.status(500).json({ message: 'Failed to delete submissions', error: error.message });
  }
});

// ===== SERVICES MANAGEMENT =====
// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// Get all services (admin only)
app.get('/api/admin/services', auth, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    console.error('Get admin services error:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// Create service (admin only)
app.post('/api/admin/services', auth, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
});

// Update service (admin only)
app.put('/api/admin/services/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

// Delete service (admin only)
app.delete('/api/admin/services/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

// ===== HOMEPAGE CONTENT MANAGEMENT =====
// Get homepage content
app.get('/api/homepage-content', async (req, res) => {
  try {
    const content = await HomepageContent.find({ isActive: true });
    res.json(content);
  } catch (error) {
    console.error('Get homepage content error:', error);
    res.status(500).json({ message: 'Failed to fetch homepage content', error: error.message });
  }
});

// Get all homepage content (admin only)
app.get('/api/admin/homepage-content', auth, async (req, res) => {
  try {
    const content = await HomepageContent.find();
    res.json(content);
  } catch (error) {
    console.error('Get admin homepage content error:', error);
    res.status(500).json({ message: 'Failed to fetch homepage content', error: error.message });
  }
});

// Update homepage content (admin only)
app.put('/api/admin/homepage-content/:id', auth, async (req, res) => {
  try {
    const content = await HomepageContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content updated successfully', content });
  } catch (error) {
    console.error('Update homepage content error:', error);
    res.status(500).json({ message: 'Failed to update content', error: error.message });
  }
});

// ===== CONTACT DETAILS MANAGEMENT =====
// Get contact details
app.get('/api/contact-details', async (req, res) => {
  try {
    const details = await ContactDetails.find({ isActive: true });
    res.json(details);
  } catch (error) {
    console.error('Get contact details error:', error);
    res.status(500).json({ message: 'Failed to fetch contact details', error: error.message });
  }
});

// Get all contact details (admin only)
app.get('/api/admin/contact-details', auth, async (req, res) => {
  try {
    const details = await ContactDetails.find();
    res.json(details);
  } catch (error) {
    console.error('Get admin contact details error:', error);
    res.status(500).json({ message: 'Failed to fetch contact details', error: error.message });
  }
});

// Update contact details (admin only)
app.put('/api/admin/contact-details/:id', auth, async (req, res) => {
  try {
    const details = await ContactDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!details) {
      return res.status(404).json({ message: 'Contact details not found' });
    }
    res.json({ message: 'Contact details updated successfully', details });
  } catch (error) {
    console.error('Update contact details error:', error);
    res.status(500).json({ message: 'Failed to update contact details', error: error.message });
  }
});

// ===== PROJECT PHOTOS MANAGEMENT =====
// Get project photos
app.get('/api/project-photos', async (req, res) => {
  try {
    const photos = await ProjectPhoto.find({ isActive: true }).sort({ order: 1 });
    res.json(photos);
  } catch (error) {
    console.error('Get project photos error:', error);
    res.status(500).json({ message: 'Failed to fetch project photos', error: error.message });
  }
});

// Get all project photos (admin only)
app.get('/api/admin/project-photos', auth, async (req, res) => {
  try {
    const photos = await ProjectPhoto.find().sort({ order: 1 });
    res.json(photos);
  } catch (error) {
    console.error('Get admin project photos error:', error);
    res.status(500).json({ message: 'Failed to fetch project photos', error: error.message });
  }
});

// Create project photo (admin only)
app.post('/api/admin/project-photos', auth, async (req, res) => {
  try {
    const photo = await ProjectPhoto.create(req.body);
    res.status(201).json({ message: 'Project photo created successfully', photo });
  } catch (error) {
    console.error('Create project photo error:', error);
    res.status(500).json({ message: 'Failed to create project photo', error: error.message });
  }
});

// Update project photo (admin only)
app.put('/api/admin/project-photos/:id', auth, async (req, res) => {
  try {
    const photo = await ProjectPhoto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!photo) {
      return res.status(404).json({ message: 'Project photo not found' });
    }
    res.json({ message: 'Project photo updated successfully', photo });
  } catch (error) {
    console.error('Update project photo error:', error);
    res.status(500).json({ message: 'Failed to update project photo', error: error.message });
  }
});

// Delete project photo (admin only)
app.delete('/api/admin/project-photos/:id', auth, async (req, res) => {
  try {
    const photo = await ProjectPhoto.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Project photo not found' });
    }
    res.json({ message: 'Project photo deleted successfully' });
  } catch (error) {
    console.error('Delete project photo error:', error);
    res.status(500).json({ message: 'Failed to delete project photo', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port', PORT)); 