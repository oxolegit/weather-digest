import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fetchJson } from "../src/api/http.js";
import { HttpError, NetworkError, TimeoutError, InvalidJsonError } from "../src/errors.js";

let originalFetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("бросает HttpError при статусе 404", async () => {
  globalThis.fetch = async () => new Response("not found", { status: 404 });
  await assert.rejects(() => fetchJson("http://test", 1000), HttpError);
});

test("бросает HttpError при статусе 500", async () => {
  globalThis.fetch = async () => new Response("boom", { status: 500 });
  await assert.rejects(() => fetchJson("http://test", 1000), HttpError);
});

test("бросает InvalidJsonError при некорректном JSON", async () => {
  globalThis.fetch = async () => new Response("не json", { status: 200 });
  await assert.rejects(() => fetchJson("http://test", 1000), InvalidJsonError);
});

test("бросает NetworkError при сбое сети", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("fetch failed");
  };
  await assert.rejects(() => fetchJson("http://test", 1000), NetworkError);
});

test("бросает TimeoutError при превышении таймаута", async () => {
  globalThis.fetch = (url, { signal }) =>
    new Promise((resolve, reject) => {
      signal.addEventListener("abort", () => {
        const error = new Error("aborted");
        error.name = "AbortError";
        reject(error);
      });
    });
  await assert.rejects(() => fetchJson("http://test", 10), TimeoutError);
});

test("возвращает разобранный JSON при успешном ответе", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ ok: true }), { status: 200 });
  const result = await fetchJson("http://test", 1000);
  assert.deepEqual(result, { ok: true });
});
