import { parseArgs } from "./cli/args.js";
import { processCities } from "./services/weather.js";
import { printDigest } from "./format/console.js";
import { AppError } from "./errors.js";

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(args.helpText);
    return;
  }

  const results = await processCities(args.cities, args.days, { noCache: args.noCache });

  let hasErrors = false;
  for (const result of results) {
    if (result.digest) {
      printDigest(result.digest, { fromCache: result.fromCache });
    } else {
      hasErrors = true;
      console.error(`\nОшибка [${result.city}]: ${result.error.message}`);
    }
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  if (error instanceof AppError) {
    console.error(`Ошибка: ${error.message}`);
  } else {
    console.error(`Непредвиденная ошибка: ${error.message}`);
  }
  process.exitCode = 1;
});
