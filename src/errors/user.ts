import { DefaultError } from "./default";

export class EmailAlreadyInUserError extends DefaultError {
  constructor(email: string) {
    super(`this email ${email} is already in use`);
    this.name = "EmailAlreadyInUserError";
    this.statusCode = 409;
  }
}
