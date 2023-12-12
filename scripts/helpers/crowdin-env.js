/**
 * Get hold of crowdin config from environment variables.
 * @returns {{baseUrl: string, projectId: string, token: string}}
 */
export function getCrowdinEnv() {
  return {
    token: process.env.CROWDIN_API_TOKEN,
    baseUrl: process.env.CROWDIN_BASE_URL,
    projectId: process.env.CROWDIN_PROJECT_ID,
  };
}