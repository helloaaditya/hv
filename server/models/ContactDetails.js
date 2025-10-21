const mongoose = require('mongoose');

const ContactDetailsSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactDetails', ContactDetailsSchema);
