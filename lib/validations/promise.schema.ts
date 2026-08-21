import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const electionPromiseBaseSchema = z.object({

    politician: z
        .string()
        .regex(
            objectIdRegex,
            "Invalid politician ID"
        ),

    title: z
        .string()
        .trim()
        .min(
            3,
            "Promise title must contain at least 3 characters"
        )
        .max(
            200,
            "Promise title cannot exceed 200 characters"
        ),

    description: z
        .string()
        .trim()
        .max(
            3000,
            "Description cannot exceed 3000 characters"
        )
        .optional(),

    date: z
        .coerce
        .date()
        .max(
            new Date(),
            "Promise date cannot be in the future"
        ),

    source: z
        .string()
        .url(
            "Source must be a valid URL"
        ),

    status: z
        .enum([
            "Promised",
            "In Progress",
            "Completed",
            "Not Completed"
        ])
        .default("Promised"),

    completionDate: z
        .coerce
        .date()
        .optional()
});

export const createElectionPromiseSchema =
    electionPromiseBaseSchema.refine(
        (data) => {

            if (
                data.status === "Completed" &&
                !data.completionDate
            ) {
                return false;
            }

            return true;
        },
        {
            message:
                "Completion date is required when promise is completed",
            path: ["completionDate"]
        }
    );

export const updateElectionPromiseSchema =
    electionPromiseBaseSchema
        .omit({
            politician: true
        })
        .partial();