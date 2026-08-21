import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const ratingSchema = z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5");

export const createReviewSchema = z.object({

    politician: z
        .string()
        .regex(
            objectIdRegex,
            "Invalid politician ID"
        ),

    overallRating: ratingSchema,

    developmentRating: ratingSchema,

    accessibilityRating: ratingSchema,

    transparencyRating: ratingSchema,

    infrastructureRating: ratingSchema,

    comment: z
        .string()
        .trim()
        .max(
            1000,
            "Review cannot exceed 1000 characters"
        )
        .optional()
});


export const updateReviewSchema = z.object({

    overallRating: ratingSchema.optional(),

    developmentRating: ratingSchema.optional(),

    accessibilityRating: ratingSchema.optional(),

    transparencyRating: ratingSchema.optional(),

    infrastructureRating: ratingSchema.optional(),

    comment: z
        .string()
        .trim()
        .max(
            1000,
            "Review cannot exceed 1000 characters"
        )
        .optional()
});