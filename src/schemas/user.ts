import validor from "validator";
import { z } from "zod";

export const createUserSchema = z.strictObject({
  first_name: z.string().toLowerCase().trim().min(1, { error: "First name is required" }),
  last_name: z.string().toLowerCase().trim().min(1, { error: "Last name is required" }),
  email: z.email({ error: "Please provide a valid e-mail" }).toLowerCase(),
  password: z
    .string()
    .trim()
    .refine(
      (value) => {
        return validor.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 0,
          minNumbers: 0,
          minSymbols: 0,
          minUppercase: 0,
        });
      },
      { error: "Password must have at least 6 characters." },
    ),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const getUserByIdSchema = z.strictObject({
  id: z.uuid({ error: "The provided id is not valid." }),
});

export type GetUserByIdSchema = z.infer<typeof getUserByIdSchema>;

export const updateUserSchema = z.strictObject({
  id: z.uuid({ error: "The provided id is not valid." }),
  first_name: z
    .string()
    .toLowerCase()
    .trim()
    .min(1, { error: "First name is required" })
    .optional(),
  last_name: z
    .string()
    .toLowerCase()
    .trim()
    .min(1, { error: "Last name is required" })
    .optional(),
  email: z.email({ error: "Please provide a valid e-mail" }).toLowerCase().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
