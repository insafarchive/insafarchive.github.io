/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Centralized Repository & GitHub Configuration
 * Provides verified repository identity, issue templates, and honest unconfigured fallbacks
 */

export interface RepositoryConfig {
  owner: string;
  repo: string;
  isConfigured: boolean;
  issuesUrl: string;
  pullsUrl: string;
  baseUrl: string;
  configurationWarning?: string;
}

/**
 * Returns the centralized repository configuration.
 * Reads environment variable VITE_GITHUB_REPO (format: 'owner/repo').
 * If not set or locally unverified, returns isConfigured: false with a clear explanation.
 */
export function getRepositoryConfig(): RepositoryConfig {
  const envRepo = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GITHUB_REPO;
  
  if (typeof envRepo === 'string' && envRepo.trim().includes('/')) {
    const [owner, repo] = envRepo.trim().split('/');
    const baseUrl = `https://github.com/${owner}/${repo}`;
    return {
      owner,
      repo,
      isConfigured: true,
      baseUrl,
      issuesUrl: `${baseUrl}/issues/new/choose`,
      pullsUrl: `${baseUrl}/pulls`,
    };
  }

  // Fallback for unconfigured / local-only deployments
  return {
    owner: 'insafarchive',
    repo: 'insafarchive',
    isConfigured: false,
    baseUrl: 'https://github.com/insafarchive/insafarchive',
    issuesUrl: 'https://github.com/insafarchive/insafarchive/issues/new/choose',
    pullsUrl: 'https://github.com/insafarchive/insafarchive/pulls',
    configurationWarning:
      'Repository remote is not verified from local git configuration. To enable direct one-click navigation to your specific repository fork, set VITE_GITHUB_REPO in your environment (e.g. owner/repo).',
  };
}
