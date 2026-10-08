import { postgresHelper } from "@/db";

export interface IGetUserByEmailRepositoryInput {
  email: string;
}

export interface IGetUserByEmailRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IGetUserByEmailRepository {
  execute(
    data: IGetUserByEmailRepositoryInput,
  ): Promise<IGetUserByEmailRepositoryOutput | null>;
}

export class PostgresGetUserByEmailRepository implements IGetUserByEmailRepository {
  async execute(
    data: IGetUserByEmailRepositoryInput,
  ): Promise<IGetUserByEmailRepositoryOutput | null> {
    const user = await postgresHelper<IGetUserByEmailRepositoryOutput>(
      `
        select 
            id, 
            first_name, 
            last_name, 
            email, 
            "password"
        from public.users
        where email = $1;    
    `,
      [data.email],
    );

    return user.length === 0 ? null : user[0];
  }
}
