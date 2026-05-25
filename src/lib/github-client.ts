import { Octokit } from '@octokit/rest'

export function createOctokitClient(token: string) {
  return new Octokit({ auth: token })
}

export async function getUserRepositories(token: string) {
  const octokit = createOctokitClient(token)
  try {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      sort: 'updated',
    })
    return response.data
  } catch (error) {
    console.error('Error fetching repositories:', error)
    throw error
  }
}

export async function getRepositoryPullRequests(
  token: string,
  owner: string,
  repo: string,
  state: 'open' | 'closed' | 'all' = 'open'
) {
  const octokit = createOctokitClient(token)
  try {
    const response = await octokit.pulls.list({
      owner,
      repo,
      state,
      per_page: 50,
      sort: 'updated',
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching PRs for ${owner}/${repo}:`, error)
    throw error
  }
}

export async function getPullRequest(
  token: string,
  owner: string,
  repo: string,
  prNumber: number
) {
  const octokit = createOctokitClient(token)
  try {
    const prResponse = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    })
    const filesResponse = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
    })
    return {
      pr: prResponse.data,
      files: filesResponse.data,
    }
  } catch (error) {
    console.error(`Error fetching PR ${prNumber}:`, error)
    throw error
  }
}

export async function getAuthenticatedUser(token: string) {
  const octokit = createOctokitClient(token)
  try {
    const response = await octokit.users.getAuthenticated()
    return response.data
  } catch (error) {
    console.error('Error fetching authenticated user:', error)
    throw error
  }
}
