const {GITHUB_USERNAME,GITHUB_REPO,GITHUB_TOKEN}=require('../../config/index');
const axios = require('axios');
const githubApiBaseUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`;

const githubHeaders = {
  Authorization: `GITHUB_TOKEN ${GITHUB_TOKEN}`,
  'GITHUB_USERNAME-Agent': 'GitHub Issues Sync',
};

async function getGitHubIssues() {
  try {
    const { data: openIssues } = await axios.get(`${githubApiBaseUrl}/issues`, {
      headers: githubHeaders,
    });

    const { data: closedIssues } = await axios.get(`${githubApiBaseUrl}/issues?state=closed`, {
      headers: githubHeaders,
    });

    const issues = [...(openIssues || []), ...(closedIssues || [])];
    
    return issues;
  } catch (error) {
    console.error('Error fetching GitHub issues:', error.message);
    throw error;
  }
}

module.exports = {
  getGitHubIssues,
  githubHeaders,
  githubApiBaseUrl
};
