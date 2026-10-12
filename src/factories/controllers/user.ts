import { IdGeneratorAdapter, PasswordHasherAdapter } from "@/adapters";
import { CreateUserController, GetUserByIdController } from "@/controllers";
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
} from "@/repositories";
import { CreateUserUseCase, GetUserByIdUseCase } from "@/use-cases";

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

export function makeGetUserByIdController() {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
  return getUserByIdController;
}
