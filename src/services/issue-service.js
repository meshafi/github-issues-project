const axios = require("axios");
const { githubHeaders, githubApiBaseUrl } = require("../github/github-service");
const Issue = require("../models/issue-model");

async function getIssueById(issueId) {
  try {
    const issueFromDB = await Issue.findOne({ number: issueId });
    return issueFromDB;
  } catch (error) {
    console.error(`Error fetching issue from the database: ${error.message}`);
    throw error;
  }
}

async function updateIssue(issueId, updatedIssueDetails) {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { number: issueId },
      updatedIssueDetails,
      { new: true }
    );

    return updatedIssue;
  } catch (error) {
    console.error(`Error updating issue in the database: ${error.message}`);
    throw error;
  }
}

async function updateGitHubIssue(issueId, updatedIssueDetails) {
  try {
    const { data: githubResponse } = await axios.patch(
      `${githubApiBaseUrl}/issues/${issueId}`,
      updatedIssueDetails,
      { headers: githubHeaders }
    );

    console.log(`GitHub issue ${issueId} updated:`, githubResponse);
  } catch (error) {
    console.error(`Error updating issue on GitHub: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getIssueById,
  updateIssue,
  updateGitHubIssue,
};
