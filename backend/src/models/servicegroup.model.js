// models/ServiceGroup.js
const mongoose = require('mongoose');

const serviceGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceGroup = mongoose.model('ServiceGroup', serviceGroupSchema);

module.exports = ServiceGroup;
