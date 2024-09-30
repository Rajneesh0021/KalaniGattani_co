const Consultant = require('../models/consultant.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new consultant
exports.createConsultant = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if consultant already exists
    const existingConsultant = await Consultant.findOne({ email });
    if (existingConsultant) {
      return res.status(400).json({ message: 'Consultant already exists' });
    }

    const newConsultant = new Consultant({ name, email, password });
    await newConsultant.save();
    res.status(201).json({ message: 'Consultant created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating consultant', error });
  }
};
// get consultants
exports.getConsultants = async (req, res) => {
  
  try {
    const consultants = await Consultant.find();
    if (!consultants) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    res.status(200).json({ message: 'Consultant updated successfully', consultants });
  } catch (error) {
    res.status(500).json({ message: 'Error updating consultant', error });
  }
};
// Consultant login
exports.loginConsultant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const consultant = await Consultant.findOne({ email });
    if (!consultant) {
      return res.status(400).json({ message: 'Consultant not found' });
    }

    const isMatch = await consultant.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ consultantId: consultant._id, role: consultant.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Update consultant
exports.updateConsultant = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const consultant = await Consultant.findById(id);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    // Update consultant details
    consultant.name = name || consultant.name;
    consultant.email = email || consultant.email;

    if (password) {
      consultant.password = await bcrypt.hash(password, 10);
    }

    await consultant.save();
    res.status(200).json({ message: 'Consultant updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating consultant', error });
  }
};
// Delete consultant
exports.deleteConsultant = async (req, res) => {
  const { id } = req.params;

  try {
    const consultant = await Consultant.findById(id);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    await consultant.remove();
    res.status(200).json({ message: 'Consultant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting consultant', error });
  }
};
