import type { Request } from "express";
import { updateUserSchema } from "@/schemas";
import type { IUpdateUserUseCase } from "@/use-cases";
import { httpErrorResponse, okResponse } from "../helpers";

export class UpdateUserController {
  private updateUserUseCase: IUpdateUserUseCase;

  constructor(UpdateUserUseCase: IUpdateUserUseCase) {
    this.updateUserUseCase = UpdateUserUseCase;
  }

  async execute(req: Request) {
    try {
      const params = req.body;
      const id = req.params.id;

      const data = await updateUserSchema.parseAsync({
        id,
        ...params,
      });

      const user = await this.updateUserUseCase.execute(data);

      return okResponse(user);
    } catch (error: unknown) {
      return httpErrorResponse(error);
    }
  }
}
