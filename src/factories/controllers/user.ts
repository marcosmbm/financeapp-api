import { IdGeneratorAdapter, PasswordHasherAdapter } from "@/adapters";
import { CreateUserController } from "@/controllers";
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "@/repositories";
import { CreateUserUseCase } from "@/use-cases";

export function makeCreateUserController() {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const passwordHasherAdapter = new PasswordHasherAdapter();
  const idGeneratorAdapter = new IdGeneratorAdapter();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
    passwordHasherAdapter,
    idGeneratorAdapter,
  );

  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
}
