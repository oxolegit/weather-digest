import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { readReport, writeReport } from "../src/storage/reports.js";

let tmpDir;
let originalCwd;

before(async () => {
  originalCwd = process.cwd();
  tmpDir = await mkdtemp(path.join(os.tmpdir(), "weather-digest-"));
  process.chdir(tmpDir);
});

after(async () => {
  process.chdir(originalCwd);
  await rm(tmpDir, { recursive: true, force: true });
});

test("readReport возвращает null, если отчёта ещё нет", async () => {
  const result = await readReport("Несуществующий Город");
  assert.equal(result, null);
});

test("writeReport сохраняет отчёт, readReport читает его обратно", async () => {
  const digest = { city: "Тест", country: "Тест", days: [] };
  await writeReport("Тест", digest);
  const result = await readReport("Тест");
  assert.deepEqual(result, digest);
});
