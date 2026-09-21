import { test } from "node:test";
import assert from "node:assert/strict";
import { parseArgs } from "../src/cli/args.js";

test("разбирает список городов и days по умолчанию", () => {
  const args = parseArgs(["--city", "Москва, Казань"]);
  assert.deepEqual(args.cities, ["Москва", "Казань"]);
  assert.equal(args.days, 3);
  assert.equal(args.noCache, false);
});

test("бросает ошибку без --city", () => {
  assert.throws(() => parseArgs(["--days", "3"]), /--city/);
});

test("бросает ошибку при days вне диапазона 1-7", () => {
  assert.throws(() => parseArgs(["--city", "Москва", "--days", "9"]), /--days/);
});

test("бросает ошибку при нечисловом days", () => {
  assert.throws(() => parseArgs(["--city", "Москва", "--days", "abc"]), /--days/);
});

test("распознаёт флаг --no-cache", () => {
  const args = parseArgs(["--city", "Москва", "--no-cache"]);
  assert.equal(args.noCache, true);
});

test("--help возвращает текст справки без ошибок", () => {
  const args = parseArgs(["--help"]);
  assert.equal(args.help, true);
  assert.match(args.helpText, /Использование/);
});
