const Service = require('../models/services.model'); // Adjust the path as needed

// Create a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ service, success: true });
  } catch (error) {
    console.error('Create Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services, success: true });
  } catch (error) {
    console.error('Get Services Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found', success: false });
    }
    res.status(200).json({ service, success: true });
  } catch (error) {
    console.error('Get Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found', success: false });
    }
    res.status(200).json({ service, success: true });
  } catch (error) {
    console.error('Update Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found', success: false });
    }
    res.status(200).json({ message: 'Service deleted successfully', success: true });
  } catch (error) {
    console.error('Delete Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
