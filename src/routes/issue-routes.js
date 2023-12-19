const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issue-Controller");
const { authenticateJWT } = require('../middlewares/auth-middleware');

router.get("/issues/:issue_id",authenticateJWT ,issueController.getIssue);
router.put("/issues/:issue_id", authenticateJWT,issueController.updateIssue);

module.exports = router;
