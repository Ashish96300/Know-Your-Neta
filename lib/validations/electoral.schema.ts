import { z } from "zod";

export const ELECTORAL_AREA_TYPES = [
    "State",
    "LokSabha",
    "VidhanSabha",
    "MunicipalWard",
] as const;

export const PARENT_TYPE_MAP = {
    State: null,
    LokSabha: "State",
    VidhanSabha: "LokSabha",
    MunicipalWard: "VidhanSabha",
} as const;

export const AREA_RANK = {
    State: 1,
    LokSabha: 2,
    VidhanSabha: 3,
    MunicipalWard: 4,
} as const;


// Base fields
const electoralAreaBaseSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, "Area name must contain at least 2 characters")
        .max(100, "Area name cannot exceed 100 characters"),

    type: z.enum(ELECTORAL_AREA_TYPES),

    parentArea: z
        .string()
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid parent area ID"
        )
        .optional(),

    number: z
        .number()
        .int("Area number must be an integer")
        .positive("Area number must be positive")
        .optional(),
});


// CREATE
export const createElectoralAreaSchema =
    electoralAreaBaseSchema.superRefine((data, ctx) => {

        if (data.type === "State" && data.parentArea) {
            ctx.addIssue({
                code: "custom",
                path: ["parentArea"],
                message: "State cannot have a parent area",
            });
        }

        if (data.type !== "State" && !data.parentArea) {
            ctx.addIssue({
                code: "custom",
                path: ["parentArea"],
                message: `${data.type} must have a parent area`,
            });
        }

        if (data.type === "State" && data.number !== undefined) {
            ctx.addIssue({
                code: "custom",
                path: ["number"],
                message: "State cannot have an area number",
            });
        }

        if (data.type !== "State" && data.number === undefined) {
            ctx.addIssue({
                code: "custom",
                path: ["number"],
                message: `${data.type} must have an area number`,
            });
        }
    });


// UPDATE
export const updateElectoralAreaSchema =
    electoralAreaBaseSchema.partial();