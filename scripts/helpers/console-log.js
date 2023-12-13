import chalk from "chalk";

/**
 * Just a tidy way to log many lines to the console
 * @param {string[]} lines - The lines to be logged to the console
 */
export function consoleLogLines(lines) {
  lines.forEach((line) => {
    console.log(line);
  });
}

/**
 * A tidy way to warn many lines to the console
 * @param {string[]} lines
 */
export function consoleWarnLines(lines) {
  lines.forEach((line) => {
    console.warn(chalk.yellow(line));
  });
}

export function logWarn(line) {
  console.warn(chalk.yellow(`⚠️  WARNING: ${line}`));
}

export function logError(line) {
  console.error(chalk.red(`❌ ERROR: ${line}`));
}

export function logInfo(line) {
  console.info(chalk.cyan(`ℹ️  INFO: ${line}`));
}