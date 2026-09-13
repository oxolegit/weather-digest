import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

const FORBIDDEN_CHARS = /[\\/:*?"<>|]/g;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function sanitizeCityName(city) {
  return city.replace(FORBIDDEN_CHARS, "_");
}

export function reportPath(city, date = today()) {
  const fileName = `${sanitizeCityName(city)}-${date}.json`;
  return path.join(config.reportsDir, fileName);
}

export async function readReport(city) {
  try {
    const content = await readFile(reportPath(city), "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function writeReport(city, digest) {
  await mkdir(config.reportsDir, { recursive: true });
  await writeFile(reportPath(city), JSON.stringify(digest, null, 2), "utf-8");
}
