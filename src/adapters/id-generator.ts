import crypto from "node:crypto";

export interface IIdGeneratorAdapter {
  execute(): string;
}

export class IdGeneratorAdapter implements IIdGeneratorAdapter {
  execute(): string {
    return crypto.randomUUID();
  }
}
