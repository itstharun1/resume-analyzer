const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  analysis: { type: Object, required: true }
});

module.exports = mongoose.model('Resume', resumeSchema);
