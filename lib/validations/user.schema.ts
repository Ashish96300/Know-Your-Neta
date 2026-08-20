import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailValidation = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address")
  .toLowerCase(); 

const passwordValidation = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(
    passwordRegex,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    profile: z
      .string()
      .trim()
      .min(1, "Profile info or image URL is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Password is required"),
});


export const userResponseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  profile: z.string(),
  role: z.enum(["user", "admin"]), 
  createdAt: z.date().optional(),  
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
