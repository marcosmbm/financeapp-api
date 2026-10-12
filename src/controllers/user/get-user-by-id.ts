import type { Request } from "express";
import { getUserByIdSchema } from "@/schemas";
import type { IGetUserByIdUseCase } from "@/use-cases";
import { httpErrorResponse, okResponse } from "../helpers";

export class GetUserByIdController {
  private getUserByIdUseCase: IGetUserByIdUseCase;

  constructor(getUserByIdUseCase: IGetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  async execute(req: Request) {
    try {
      const id = req.params.id as string;

      const data = await getUserByIdSchema.parseAsync({ id });

      const user = await this.getUserByIdUseCase.execute(data);

      return okResponse(user);
    } catch (error: unknown) {
      return httpErrorResponse(error);
    }
  }
}
