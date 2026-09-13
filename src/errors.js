export class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = "AppError";
  }
}

export class ArgsError extends AppError {
  constructor(message) {
    super(message);
    this.name = "ArgsError";
  }
}

export class CityNotFoundError extends AppError {
  constructor(city) {
    super(`город не найден: ${city}`);
    this.name = "CityNotFoundError";
  }
}

export class HttpError extends AppError {
  constructor(status, url) {
    super(`ответ API со статусом ${status} (${url})`);
    this.name = "HttpError";
    this.status = status;
  }
}

export class NetworkError extends AppError {
  constructor(url, cause) {
    super(`сеть недоступна: ${url}`);
    this.name = "NetworkError";
    this.cause = cause;
  }
}

export class TimeoutError extends AppError {
  constructor(url) {
    super(`превышен таймаут запроса: ${url}`);
    this.name = "TimeoutError";
  }
}

export class InvalidJsonError extends AppError {
  constructor(url) {
    super(`некорректный JSON в ответе: ${url}`);
    this.name = "InvalidJsonError";
  }
}
