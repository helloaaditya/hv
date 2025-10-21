const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, default: '' },
  category: { type: String, required: true, enum: ['flooring', 'waterproofing'] },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
