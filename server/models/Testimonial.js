const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  isApproved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema); 