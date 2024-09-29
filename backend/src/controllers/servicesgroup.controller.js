// controllers/serviceGroupController.js
const ServiceGroup = require('../models/servicegroup.model');

// Create a new service group
exports.createServiceGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const serviceGroup = new ServiceGroup({ name, description });

    await serviceGroup.save();
    res.status(201).json({ success: true, serviceGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all service groups
exports.getServiceGroups = async (req, res) => {
  try {
    const serviceGroups = await ServiceGroup.find();
    res.status(200).json({ success: true, serviceGroups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get a single service group by ID
exports.getServiceGroupById = async (req, res) => {
  try {
    const serviceGroup = await ServiceGroup.findById(req.params.id);

    if (!serviceGroup) {
      return res.status(404).json({ success: false, message: 'Service group not found' });
    }

    res.status(200).json({ success: true, serviceGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update a service group
exports.updateServiceGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const serviceGroup = await ServiceGroup.findByIdAndUpdate(req.params.id, { name, description }, { new: true, runValidators: true });

    if (!serviceGroup) {
      return res.status(404).json({ success: false, message: 'Service group not found' });
    }

    res.status(200).json({ success: true, serviceGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a service group
exports.deleteServiceGroup = async (req, res) => {
  try {
    const serviceGroup = await ServiceGroup.findByIdAndDelete(req.params.id);

    if (!serviceGroup) {
      return res.status(404).json({ success: false, message: 'Service group not found' });
    }

    res.status(200).json({ success: true, message: 'Service group deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
