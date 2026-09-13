export function printDigest(digest, { fromCache = false } = {}) {
  const source = fromCache ? " (из кэша)" : "";
  console.log(`\n${digest.city}, ${digest.country}${source}`);
  console.log(`Координаты: ${digest.latitude}, ${digest.longitude}`);
  console.log("Дата        Мин, °C   Макс, °C   Осадки, мм");
  for (const day of digest.days) {
    console.log(
      `${day.date}  ${padNum(day.tempMin)}      ${padNum(day.tempMax)}       ${padNum(day.precipitation)}`,
    );
  }
}

function padNum(value) {
  return String(value).padStart(6, " ");
}
