import { program } from "commander";
import { sendNotification } from "./helpers/crowdin-api.js";
import { logWarn } from "./helpers/console-log.js";

program
  .requiredOption("--body <text>", "Text body of the comment")
  .requiredOption("--author <author>", "Username of comment author")
  .requiredOption("--path <path>", "Path to file that was commented on")
  .requiredOption("--commented-on <code>", "The line of code the user commented on")
  .requiredOption("--pull-request-url <url>", "A link to the PR discussion")
  .parse(process.argv);

const options = program.opts();
const isJavaSourceFile = options.path.toLowerCase().includes("messages.properties");
const localePattern = /(?:.*[\/_])?([a-z]{2})(?=[\/\._])/;
const match = options.path.match(localePattern);

let locale = match ? match[1] : null;
let userIds = [];

if (isJavaSourceFile) locale = "en";

/**
 * Gracefully exit if no locale can be extrapolated from path.
 * The file filter is not good enough to avoid potential accidental runs
 * of this script.
 */
if (locale === null && !isJavaSourceFile) {
  logWarn(`No locale found in path: ${options.path}. Exiting...`);
  process.exit(0);
}

switch (locale) {
  case "nb": {
    // anette.svendsen@schibsted.com (17) + sarah.blystad@schibsted.com (1)
    userIds = [17, 1];
    break;
  }
  case "fi": {
    // anna-reetta.kytolahti@schibsted.com (15) + sarah.blystad@schibsted.com (1)
    userIds = [15, 1];
    break;
  }
  case "en": {
    // sarah.blystad@schibsted.com (1)
    userIds = [1];
    break;
  }
  case "sv":
  case "da":
    throw new Error(`❌ Unsupported locale: ${locale}`);
}

if (userIds.length >= 0) {
  await sendNotification(
    userIds,
    `Pull request comment received! \n\n
     Author:  ${options.author} \n
     Comment: ${options.body} \n
     File:    ${options.path}. \n
     Pull Request URL: ${options.pullRequestUrl} \n\n
     The line in question reads: ${options.commentedOn}`,
  );
} else {
  logWarn(`No user IDs specified.`);
}