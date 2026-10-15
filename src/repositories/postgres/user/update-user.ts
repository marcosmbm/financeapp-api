import { postgresHelper } from "@/db";

export interface IUpdateUserRepositoryInput {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface IUpdateUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IUpdateUserRepository {
  execute(data: IUpdateUserRepositoryInput): Promise<IUpdateUserRepositoryOutput>;
}

export class PostgresUpdateUserRepository implements IUpdateUserRepository {
  async execute(data: IUpdateUserRepositoryInput): Promise<IUpdateUserRepositoryOutput> {
    const { id, ...updateParams } = data;
    const fields = Object.keys(updateParams);

    const updateFields = [];
    const updateValues = [];
    let index = 2;

    for (const field of fields) {
      const param = updateParams[field as keyof typeof updateParams];

      if (param) {
        updateValues.push(param);
        updateFields.push(`${field}=$${index}`);
        index++;
      }
    }

    if (updateFields.length === 0) {
      throw new Error("No field was provided");
    }

    const result = await postgresHelper<IUpdateUserRepositoryOutput>(
      `
      UPDATE public.users
      SET ${updateFields.join(", ")}
      WHERE id=$1
      returning id, first_name, last_name, email;
  `,
      [data.id, ...updateValues],
    );

    return result[0];
  }
}
