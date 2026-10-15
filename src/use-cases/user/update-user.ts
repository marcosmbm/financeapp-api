import { EmailAlreadyInUserError, UserNotFoundError } from "@/errors";
import type {
  IGetUserByEmailRepository,
  IGetUserByIdRepository,
  IUpdateUserRepository,
} from "@/repositories";

export interface IUpdateUserUseCaseInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  id: string;
}

export interface IUpdateUserUseCaseOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUpdateUserUseCase {
  execute(data: IUpdateUserUseCaseInput): Promise<IUpdateUserUseCaseOutput>;
}

export class UpdateUserUseCase implements IUpdateUserUseCase {
  private readonly UpdateUserRepository: IUpdateUserRepository;
  private readonly getUserByIdRepository: IGetUserByIdRepository;
  private readonly getUserByEmailRepository: IGetUserByEmailRepository;

  constructor(
    UpdateUserRepository: IUpdateUserRepository,
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailRepository: IGetUserByEmailRepository,
  ) {
    this.UpdateUserRepository = UpdateUserRepository;
    this.getUserByIdRepository = getUserByIdRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(data: IUpdateUserUseCaseInput): Promise<IUpdateUserUseCaseOutput> {
    const user = await this.getUserByIdRepository.execute({ id: data.id });

    if (!user) {
      throw new UserNotFoundError(data.id);
    }

    if (data.email) {
      const userWithEmail = await this.getUserByEmailRepository.execute({
        email: data.email,
      });

      if (userWithEmail && userWithEmail.id !== data.id) {
        throw new EmailAlreadyInUserError(data.email);
      }
    }

    return await this.UpdateUserRepository.execute({
      id: data.id,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    });
  }
}
