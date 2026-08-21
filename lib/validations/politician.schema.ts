import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const politicianBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Politician name must contain at least 2 characters")
        .max(100, "Politician name cannot exceed 100 characters"),

    photo: z
        .string()
        .url("Photo must be a valid URL")
        .optional(),

    party: z
        .string()
        .regex(objectIdRegex, "Invalid party ID"),

    electoralArea: z
        .string()
        .regex(objectIdRegex, "Invalid electoral area ID"),

    education: z
        .string()
        .trim()
        .max(500, "Education cannot exceed 500 characters")
        .optional(),

    profession: z
        .string()
        .trim()
        .max(200, "Profession cannot exceed 200 characters")
        .optional(),

    politicalCareer: z
        .string()
        .trim()
        .max(3000, "Political career cannot exceed 3000 characters")
        .optional(),

    assets: z
        .number()
        .int("Assets must be a whole number")
        .nonnegative("Assets cannot be negative")
        .optional(),

    liabilities: z
        .number()
        .int("Liabilities must be a whole number")
        .nonnegative("Liabilities cannot be negative")
        .optional(),

    criminalCaseCount: z
        .number()
        .int("Criminal case count must be a whole number")
        .nonnegative("Criminal case count cannot be negative")
        .optional(),

    achievements: z
        .string()
        .trim()
        .max(3000, "Achievements cannot exceed 3000 characters")
        .optional(),

    status: z
        .enum(["active", "former"])
        .optional()
});

export const createPoliticianSchema =
    politicianBaseSchema.extend({
        status: z
            .enum(["active", "former"])
            .default("active")
    });

export const updatePoliticianSchema =
    politicianBaseSchema.partial();