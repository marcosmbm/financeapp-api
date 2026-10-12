import { UserNotFoundError } from "@/errors";
import type { IGetUserByIdRepository } from "@/repositories";

export interface IGetUserByIdUseCaseInput {
  id: string;
}

export interface IGetUserByIdUseCaseOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IGetUserByIdUseCase {
  execute(data: IGetUserByIdUseCaseInput): Promise<IGetUserByIdUseCaseOutput>;
}

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  private readonly getUserByIdRepository: IGetUserByIdRepository;

  constructor(getUserByIdRepository: IGetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(data: IGetUserByIdUseCaseInput): Promise<IGetUserByIdUseCaseOutput> {
    const user = await this.getUserByIdRepository.execute(data);

    if (!user) {
      throw new UserNotFoundError(data.id);
    }

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }
}
