const express = require('express');
const requestController = require('../controllers/requestController');
const upload = require('../config/multer');

const router = express.Router();

router.post('/create', upload.single('file'), requestController.createRequest);
router.get('/my-requests', requestController.getUserRequests);

module.exports = router;
