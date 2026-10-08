import bcrypt from "bcryptjs";

export interface IPasswordHasherAdapter {
  execute(password: string): Promise<string>;
}

export class PasswordHasherAdapter implements IPasswordHasherAdapter {
  async execute(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
