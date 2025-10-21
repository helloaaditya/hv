const mongoose = require('mongoose');

const HomepageContentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('HomepageContent', HomepageContentSchema);
