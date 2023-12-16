const express = require("express");
const Issue = require("../models/issue-model");
const axios = require("axios");
const router = express.Router();
const { githubHeaders, githubApiBaseUrl } = require("../github/github-service");
router.get("/issues/:issue_id", async (req, res) => {
  try {
    const { issue_id } = req.params;
    const issueFromDB = await Issue.findOne({ number: issue_id });

    if (!issueFromDB) {
      return res
        .status(404)
        .json({ success: false, message: "Issue not found in the database" });
    }

    res.json({ success: true, issue: issueFromDB });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put("/issues/:issue_id", async (req, res) => {
  try {
    const { issue_id } = req.params;
    const updatedIssueDetails = req.body;

    try {
      const updatedIssue = await Issue.findOneAndUpdate(
        { number: issue_id },
        updatedIssueDetails,
        { new: true }
      );

      if (!updatedIssue) {
        return res
          .status(404)
          .json({ success: false, message: "Issue not found" });
      }

      console.log(`Issue ${issue_id} updated in MongoDB`);
    } catch (error) {
      console.error(
        `Error updating issue ${issue_id} in MongoDB: ${error.message}`
      );
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    try {
      const { data: githubResponse } = await axios.patch(
        `${githubApiBaseUrl}/issues/${issue_id}`,
        updatedIssueDetails,
        { headers: githubHeaders }
      );

      console.log(`GitHub issue ${issue_id} updated:`, githubResponse);
    } catch (error) {
      console.error(`Error updating issue ${issue_id}: ${error.message}`);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, message: "Issue details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
