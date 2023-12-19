const express = require('express');
const syncController = require('../controllers/sync-Controller');
const { authenticateJWT } = require('../middlewares/auth-middleware');
const router = express.Router();

router.post('/sync',  authenticateJWT,syncController.syncGitHubIssues);

module.exports = router;
