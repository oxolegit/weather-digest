import { existsSync } from "node:fs";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

export const config = {
  geocodingUrl: process.env.GEOCODING_API_URL ?? "https://geocoding-api.open-meteo.com/v1/search",
  forecastUrl: process.env.FORECAST_API_URL ?? "https://api.open-meteo.com/v1/forecast",
  requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS ?? 5000),
  reportsDir: process.env.REPORTS_DIR ?? "reports",
  temperatureUnit: process.env.TEMPERATURE_UNIT ?? "celsius",
  precipitationUnit: process.env.PRECIPITATION_UNIT ?? "mm",
};
