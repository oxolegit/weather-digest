import { test } from "node:test";
import assert from "node:assert/strict";
import { buildDigest } from "../src/services/weather.js";

test("buildDigest собирает отчёт из ответа геокодинга и прогноза", () => {
  const geo = { name: "Москва", country: "Россия", latitude: 55.75, longitude: 37.6 };
  const forecast = {
    daily: {
      time: ["2026-09-13", "2026-09-14"],
      temperature_2m_min: [7.7, 9.2],
      temperature_2m_max: [16.2, 18.4],
      precipitation_sum: [0, 0.1],
    },
  };

  const digest = buildDigest(geo, forecast);

  assert.equal(digest.city, "Москва");
  assert.equal(digest.country, "Россия");
  assert.equal(digest.days.length, 2);
  assert.deepEqual(digest.days[0], {
    date: "2026-09-13",
    tempMin: 7.7,
    tempMax: 16.2,
    precipitation: 0,
  });
  assert.ok(digest.generatedAt);
});
