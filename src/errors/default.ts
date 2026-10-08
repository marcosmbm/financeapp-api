export class DefaultError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "DefaultError";
    this.statusCode = 500;
  }
}
