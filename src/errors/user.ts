import { DefaultError } from "./default";

export class EmailAlreadyInUserError extends DefaultError {
  constructor(email: string) {
    super(`this email ${email} is already in use`);
    this.name = "EmailAlreadyInUserError";
    this.statusCode = 409;
  }
}

export class UserNotFoundError extends DefaultError {
  constructor(userId: string) {
    super(`User with id ${userId} not found`);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}
