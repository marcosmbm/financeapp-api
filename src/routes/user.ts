import { Router } from "express";

import { makeCreateUserController, makeGetUserByIdController } from "@/factories";

const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  const { statusCode, body } = await makeCreateUserController().execute(req);
  return res.status(statusCode).json(body);
});

userRouter.get("/users/:id", async (req, res) => {
  const { statusCode, body } = await makeGetUserByIdController().execute(req);
  return res.status(statusCode).json(body);
});

export { userRouter };
