const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/requests', adminController.getAllRequests);
router.put('/requests/:id', adminController.updateRequestStatus);
router.delete('/requests/:id', adminController.deleteRequest);

module.exports = router;
