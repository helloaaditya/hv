const mongoose = require('mongoose');

const ProjectPhotoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, default: '' },
  completedDate: { type: String, default: '' },
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProjectPhoto', ProjectPhotoSchema);
