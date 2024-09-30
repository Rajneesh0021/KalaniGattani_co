const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultant.controller');

// Middleware to verify JWT for protected routes (if needed)
// const { authenticateToken } = require('../middleware/auth');

// Create a new consultant
router.post('/', consultantController.createConsultant);
// get consultants
router.get('/', consultantController.getConsultants);
// Consultant login
router.post('/login', consultantController.loginConsultant);

// Update consultant details
router.put('/:id',  consultantController.updateConsultant);

// Delete consultant
router.delete('/:id', consultantController.deleteConsultant);

module.exports = router;
