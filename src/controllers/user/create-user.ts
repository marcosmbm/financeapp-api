import type { Request } from "express";
import { DefaultError } from "@/errors";
import type { ICreateUserUseCase } from "@/use-cases";

export class CreateUserController {
  private createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(req: Request) {
    try {
      const data = req.body;
      const user = await this.createUserUseCase.execute(data);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error: unknown) {
      if (error instanceof DefaultError) {
        return {
          statusCode: error.statusCode,
          body: {
            message: error.message,
          },
        };
      } else {
        return {
          statusCode: 500,
          body: {
            message: "Internal server error",
          },
        };
      }
    }
  }
}
