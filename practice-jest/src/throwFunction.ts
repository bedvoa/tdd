export function error() {
  throw new Error();
}

class CustomError extends Error {}

export function customError() {
  throw new CustomError();
}
