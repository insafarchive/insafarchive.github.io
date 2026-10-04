/**
 * Repository and Workflow Configuration
 * Configures the public GitHub repository URL, issue tracker, and contribution paths.
 * Can be customized by archive maintainers if hosting under a custom organization or fork.
 */

export const REPOSITORY_CONFIG = {
  // Public repository details
  owner: 'insafarchive',
  repo: 'insafarchive',
  get repoUrl() {
    return `https://github.com/${this.owner}/${this.repo}`;
  },
  get issuesUrl() {
    return `${this.repoUrl}/issues`;
  },
  get newIssueUrl() {
    return `${this.issuesUrl}/new`;
  },
  get discussionsUrl() {
    return `${this.repoUrl}/discussions`;
  },
  
  // Specific Issue Template URLs (opens GitHub issue template directly)
  get newCaseTemplateUrl() {
    return `${this.issuesUrl}/new?template=1_new_case_submission.yml&title=%5BNew+Case%5D%3A+`;
  },
  get caseCorrectionTemplateUrl() {
    return `${this.issuesUrl}/new?template=2_case_correction_update.yml&title=%5BCorrection%5D%3A+`;
  },
  get mediaSubmissionTemplateUrl() {
    return `${this.issuesUrl}/new?template=3_media_document_submission.yml&title=%5BMedia%2FDoc%5D%3A+`;
  },

  // Fallback contact for contributors unable to create a GitHub account
  editorialEmail: 'editorial@insafarchive.org',
  correctionsEmail: 'corrections@insafarchive.org',

  // Current deployment branch and domain
  productionBranch: 'main',
  deploymentPlatform: 'GitHub Pages',
  isZeroCost: true,
};
