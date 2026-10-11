import validor from "validator";
import { z } from "zod";

export const createUserSchema = z.strictObject({
  first_name: z.string().trim().min(1, { error: "First name is required" }),
  last_name: z.string().trim().min(1, { error: "Last name is required" }),
  email: z.email({ error: "Please provide a valid e-mail" }),
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
