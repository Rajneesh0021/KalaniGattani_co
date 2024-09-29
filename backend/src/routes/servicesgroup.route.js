// routes/serviceGroupRoutes.js
const express = require('express');
const router = express.Router();
const {
  createServiceGroup,
  getServiceGroups,
  getServiceGroupById,
  updateServiceGroup,
  deleteServiceGroup,
} = require('../controllers/servicesgroup.controller');

// Route to create a new service group
router.post('/', createServiceGroup);

// Route to get all service groups
router.get('/', getServiceGroups);

// Route to get a single service group by ID
router.get('/:id', getServiceGroupById);

// Route to update a service group by ID
router.put('/:id', updateServiceGroup);

// Route to delete a service group by ID
router.delete('/:id', deleteServiceGroup);

module.exports = router;
