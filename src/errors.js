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
    const reason =
      status >= 500
        ? "сервис временно недоступен"
        : "ошибка в запросе к API (проверьте параметры)";
    super(`${reason}, статус ${status} (${url})`);
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
