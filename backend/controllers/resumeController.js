const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');
const analysisService = require('../services/analysisService');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    if (!req.file.mimetype || !req.file.mimetype.includes('pdf')) {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }
    const buffer = req.file.buffer;
    const parsed = await pdfParse(buffer);
    const text = parsed.text || '';

    const analysis = await analysisService.analyzeText(text);

    const saved = await Resume.create({
      fileName: req.file.originalname,
      analysis
    });

    res.json({ id: saved._id, analysis: saved.analysis });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Not found' });
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
