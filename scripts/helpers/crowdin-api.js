import { getCrowdinEnv } from "./crowdin-env.js";

/**
 * Send notifications to a given set of users in a project
 * @param {string[]} userIds the users to receive the notification
 * @param {string} message the message to send
 * @returns
 */
export async function sendNotification(userIds, message) {
  const { projectId, baseUrl, token } = getCrowdinEnv();

  return await fetch(`${baseUrl}/api/v2/projects/${projectId}/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userIds,
      message,
    }),
  });
}