const Issue = require('../models/issue-model');
const { getGitHubIssues } = require('../github/github-service');
const delay = require('../utils/delay');

async function syncGitHubIssues() {
  try {
    const issues = await getGitHubIssues();

    for (let i = 0; i < issues.length; i += 3) {
      const batch = issues.slice(i, i + 3);
      await Promise.all(
        batch.map(async (issue) => {
          try {
            const validatedIssue = new Issue(issue);
            await validatedIssue.validate();
          } catch (error) {
            console.error(
              `Validation error for issue ${issue.number}: ${error.message}`
            );
            return;
          }

          try {
            const updatedIssue = await Issue.findOneAndUpdate(
              { number: issue.number },
              issue,
              { upsert: true, new: true }
            );
            console.log(`Issue ${issue.number} synced successfully`);
          } catch (error) {
            console.error(
              `Error updating issue ${issue.number}: ${error.message}`
            );
          }
        })
      );
      await delay(1000);
    }

    return { success: true, message: 'Sync completed successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Internal server error');
  }
}

module.exports = {
  syncGitHubIssues,
};
