// The server could not understand the request due to invalid syntax.
export class BadRequestError extends Error {
  constructor(error) {
    super(error.message);

    this.message = error;
    this.status = 400;
  }
}

// The server can not find the requested resource.
export class NotFoundError extends Error {
  constructor(error) {
    super(error.message);

    this.message = error;
    this.status = 404;
  }
}

// The request method is known by the server but is not supported by the target resource.
// For example, an API may forbid DELETE-ing a resource.
export class MethodNotAllowedError extends Error {
  constructor(error) {
    super(error.message);

    this.message = error;
    this.status = 405;
  }
}

// The request method is not supported by the server and cannot be handled.
export class NotImplementedError extends Error {
  constructor(error) {
    super(error.message);

    this.message = error;
    this.status = 501;
  }
}