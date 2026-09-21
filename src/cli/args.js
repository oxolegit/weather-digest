import { parseArgs as nodeParseArgs } from "node:util";
import { ArgsError } from "../errors.js";

const MIN_DAYS = 1;
const MAX_DAYS = 7;
const DEFAULT_DAYS = 3;

const HELP_TEXT = `Погодный дайджест — прогноз погоды по городам через Open-Meteo

Использование:
  node src/index.js --city "Город[,Город2,...]" [--days N] [--no-cache]

Параметры:
  --city, -c     Название города или список городов через запятую (обязателен)
  --days, -d     Количество дней прогноза, 1-7 (по умолчанию 3)
  --no-cache     Игнорировать сохранённый на сегодня отчёт и запросить данные заново
  --help, -h     Показать эту справку
`;

export function parseArgs(argv) {
  let parsed;
  try {
    parsed = nodeParseArgs({
      args: argv,
      options: {
        city: { type: "string", short: "c" },
        days: { type: "string", short: "d" },
        "no-cache": { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
      allowPositionals: false,
    });
  } catch (error) {
    throw new ArgsError(`не удалось разобрать аргументы: ${error.message}`);
  }

  const { values } = parsed;

  if (values.help) {
    return { help: true, helpText: HELP_TEXT };
  }

  if (!values.city || !values.city.trim()) {
    throw new ArgsError('не указан обязательный параметр --city, например: --city "Москва"');
  }

  const cities = values.city
    .split(",")
    .map((city) => city.trim())
    .filter((city) => city.length > 0);

  if (cities.length === 0) {
    throw new ArgsError("параметр --city не содержит ни одного города");
  }

  let days = DEFAULT_DAYS;
  if (values.days !== undefined) {
    days = Number(values.days);
    if (!Number.isInteger(days) || days < MIN_DAYS || days > MAX_DAYS) {
      throw new ArgsError(
        `параметр --days должен быть целым числом от ${MIN_DAYS} до ${MAX_DAYS}, получено: ${values.days}`,
      );
    }
  }

  return {
    help: false,
    cities,
    days,
    noCache: values["no-cache"],
  };
}
