import { z } from "zod";

const emailValidation = z
  .string()
  .trim()
  .min(1, { error: "Email address is required." })
  .pipe(
    z.email({
      error: "Enter valid email address.",
    }),
  );

const passwordValidation = z
  .string()
  .min(1, { error: "Password is required." })
  .min(8, { error: "Passsord must of atleast 8 characters." });

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "First Name is required." })
    .min(2, { error: "First Name must be atleast 2 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { error: "Last Name is required." })
    .min(2, { error: "Last Name must be atleast 2 characters." }),
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginFormOutput = z.output<typeof loginSchema>;
export type RegisterFormValues = z.input<typeof registerSchema>;
export type RegisterFormOutput = z.output<typeof registerSchema>;
