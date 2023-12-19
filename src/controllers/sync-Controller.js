const syncService = require('../services/sync-service');

async function syncGitHubIssues(req, res) {
  try {
    const result = await syncService.syncGitHubIssues();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  syncGitHubIssues,
};
