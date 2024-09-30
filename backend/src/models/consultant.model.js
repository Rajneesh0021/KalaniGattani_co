const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Consultant Schema
const consultantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'consultant', // You can have different roles like admin, consultant, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
consultantSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords for login
consultantSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Consultant = mongoose.model('Consultant', consultantSchema);
module.exports = Consultant;
