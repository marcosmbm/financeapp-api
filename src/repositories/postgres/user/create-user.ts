import { postgresHelper } from "@/db";

export interface ICreateUserRepositoryInput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ICreateUserRepository {
  execute(data: ICreateUserRepositoryInput): Promise<ICreateUserRepositoryOutput>;
}

export class PostgresCreateUserRepository implements ICreateUserRepository {
  async execute(data: ICreateUserRepositoryInput): Promise<ICreateUserRepositoryOutput> {
    const result = await postgresHelper<ICreateUserRepositoryOutput>(
      `
        insert into public.users
        (id, first_name, last_name, email, "password")
        values($1, $2, $3, $4, $5)
        returning id, first_name, last_name, email;    
    `,
      [data.id, data.first_name, data.last_name, data.email, data.password],
    );

    return result[0];
  }
}
