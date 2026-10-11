import type { Request } from "express";
import { ZodError } from "zod";
import { DefaultError } from "@/errors";
import { createUserSchema } from "@/schemas";
import type { ICreateUserUseCase } from "@/use-cases";

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

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues[0].message,
          },
        };
      } else if (error instanceof DefaultError) {
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
