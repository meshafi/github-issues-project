const axios = require('axios');
const user = "meshafi";
const repository = "Art-Gallery";
const githubApiBaseUrl = `https://api.github.com/repos/${user}/${repository}`;
const token = "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";

const githubHeaders = {
  Authorization: `token ${token}`,
  'User-Agent': 'GitHub Issues Sync',
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
