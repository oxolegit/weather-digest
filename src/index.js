import { parseArgs } from "./cli/args.js";
import { AppError } from "./errors.js";

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(args.helpText);
    return;
  }

  console.log(`Города: ${args.cities.join(", ")}`);
  console.log(`Дней прогноза: ${args.days}`);
  console.log(`Кэш отключён: ${args.noCache}`);
}

main().catch((error) => {
  if (error instanceof AppError) {
    console.error(`Ошибка: ${error.message}`);
  } else {
    console.error(`Непредвиденная ошибка: ${error.message}`);
  }
  process.exitCode = 1;
});
