import { geocode, getForecast } from "../api/openMeteo.js";

export async function getCityDigest(city, days) {
  const geo = await geocode(city);
  const forecast = await getForecast(geo.latitude, geo.longitude, days);
  return buildDigest(geo, forecast);
}

export async function processCities(cities, days) {
  const results = await Promise.allSettled(cities.map((city) => getCityDigest(city, days)));

  return results.map((result, i) => ({
    city: cities[i],
    ...(result.status === "fulfilled" ? { digest: result.value } : { error: result.reason }),
  }));
}

export function buildDigest(geo, forecast) {
  const daily = forecast.daily;
  const days = daily.time.map((date, i) => ({
    date,
    tempMin: daily.temperature_2m_min[i],
    tempMax: daily.temperature_2m_max[i],
    precipitation: daily.precipitation_sum[i],
  }));

  return {
    city: geo.name,
    country: geo.country,
    latitude: geo.latitude,
    longitude: geo.longitude,
    generatedAt: new Date().toISOString(),
    days,
  };
}
