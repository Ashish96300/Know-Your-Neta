import { z } from "zod";

export const createPartySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Party name is required")
    .min(2, "Party name must be at least 2 characters")
    .max(100, "Party name cannot exceed 100 characters"),

  abbreviation: z
    .string()
    .trim()
    .min(1, "Abbreviation is required")
    .min(2, "Abbreviation must be at least 2 characters")
    .max(15, "Abbreviation cannot exceed 15 characters")
    .toUpperCase(),

  logo: z
    .string()
    .trim()
    .url("Invalid logo URL")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .default(""),
});

export const updatePartySchema = createPartySchema.partial();

export const partyResponseSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  abbreviation: z.string(),
  logo: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CreatePartyInput = z.infer<typeof createPartySchema>;
export type UpdatePartyInput = z.infer<typeof updatePartySchema>;
export type PartyResponse = z.infer<typeof partyResponseSchema>;