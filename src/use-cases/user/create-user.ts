import crypto from "node:crypto";
import type { IPasswordHasherAdapter } from "@/adapters";
import type { ICreateUserRepository, IGetUserByEmailRepository } from "@/repositories";

export interface ICreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ICreateUserUseCaseOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ICreateUserUseCase {
  execute(data: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly createUserRepository: ICreateUserRepository;
  private readonly getUserByEmailRepository: IGetUserByEmailRepository;
  private readonly passwordHasherAdapter: IPasswordHasherAdapter;

  constructor(
    createUserRepository: ICreateUserRepository,
    getUserByEmailRepository: IGetUserByEmailRepository,
    passwordHasherAdapter: IPasswordHasherAdapter,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.passwordHasherAdapter = passwordHasherAdapter;
  }

  async execute(data: ICreateUserUseCaseInput): Promise<ICreateUserUseCaseOutput> {
    const userAlreadyExists = await this.getUserByEmailRepository.execute({
      email: data.email,
    });

    if (userAlreadyExists) {
      throw new Error(`this email ${data.email} is already in use`);
    }

    const userId = crypto.randomUUID();

    const hashedPassword = await this.passwordHasherAdapter.execute(data.password);

    return await this.createUserRepository.execute({
      id: userId,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: hashedPassword,
    });
  }
}
