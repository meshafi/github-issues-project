const Joi = require('joi');
const issueService = require('../services/issue-service');
const {
  getIssueSchema,
  updateIssueSchema,
} = require('../middlewares/joi-validation');

async function getIssue(req, res, next) {
  try {
    const { error, value } = getIssueSchema.validate(req.params);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const { issue_id } = value;
    const issueFromDB = await issueService.getIssueById(issue_id);

    if (!issueFromDB) {
      return res
        .status(404)
        .json({ success: false, message: 'Issue not found in the database' });
    }

    res.json({ success: true, issue: issueFromDB });
  } catch (error) {
    next(error);
  }
}

async function updateIssue(req, res, next) {
  try {
    const { error, value } = updateIssueSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const { issue_id } = req.params;
    const updatedIssueDetails = value.updatedIssueDetails;

    const updatedIssue = await issueService.updateIssue(
      issue_id,
      updatedIssueDetails
    );

    if (!updatedIssue) {
      return res
        .status(404)
        .json({ success: false, message: 'Issue not found' });
    }

    console.log(`Issue ${issue_id} updated in MongoDB`);

    await issueService.updateGitHubIssue(issue_id, updatedIssueDetails);

    res.json({
      success: true,
      message: 'Issue details updated successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIssue,
  updateIssue,
};
