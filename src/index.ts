import "dotenv/config";

import cors from "cors";
import express, { Router } from "express";

import { env } from "./config";

import { userRouter } from "./routes";

const router = Router();
const app = express();
const port = env.API_PORT;

router.get("/", (_req, res) => {
  return res.json({ message: "Connected" });
});

app.use(express.json());
app.use(cors());
app.use(router);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
