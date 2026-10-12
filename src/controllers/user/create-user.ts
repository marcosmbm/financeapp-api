import type { Request } from "express";
import { createUserSchema } from "@/schemas";
import type { ICreateUserUseCase } from "@/use-cases";
import { createdResponse, httpErrorResponse } from "../helpers";

export class CreateUserController {
  private createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(req: Request) {
    try {
      const params = req.body;

      const data = await createUserSchema.parseAsync(params);

      const user = await this.createUserUseCase.execute(data);

      return createdResponse(user);
    } catch (error: unknown) {
      return httpErrorResponse(error);
    }
  }
}
