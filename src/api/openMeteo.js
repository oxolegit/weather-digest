import { fetchJson } from "./http.js";
import { config } from "../config.js";
import { CityNotFoundError } from "../errors.js";

export async function geocode(city) {
  const url = new URL(config.geocodingUrl);
  url.searchParams.set("name", city);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "ru");
  url.searchParams.set("format", "json");

  const data = await fetchJson(url, config.requestTimeoutMs);

  if (!data.results || data.results.length === 0) {
    throw new CityNotFoundError(city);
  }

  const [result] = data.results;
  return {
    name: result.name,
    country: result.country ?? "неизвестно",
    latitude: result.latitude,
    longitude: result.longitude,
  };
}

export async function getForecast(latitude, longitude, days) {
  const url = new URL(config.forecastUrl);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum");
  url.searchParams.set("forecast_days", String(days));
  url.searchParams.set("timezone", "auto");

  return fetchJson(url, config.requestTimeoutMs);
}
