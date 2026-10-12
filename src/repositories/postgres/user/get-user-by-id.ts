import { postgresHelper } from "@/db";

export interface IGetUserByIdRepositoryInput {
  id: string;
}

export interface IGetUserByIdRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IGetUserByIdRepository {
  execute(
    data: IGetUserByIdRepositoryInput,
  ): Promise<IGetUserByIdRepositoryOutput | null>;
}

export class PostgresGetUserByIdRepository implements IGetUserByIdRepository {
  async execute(
    data: IGetUserByIdRepositoryInput,
  ): Promise<IGetUserByIdRepositoryOutput | null> {
    const user = await postgresHelper<IGetUserByIdRepositoryOutput>(
      `
        select 
            id, 
            first_name, 
            last_name, 
            email
        from public.users
        where id = $1;    
    `,
      [data.id],
    );

    return user.length === 0 ? null : user[0];
  }
}
