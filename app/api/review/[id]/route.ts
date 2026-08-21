import { deleteMyReview } from "@/lib/controllers/review.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const DELETE = asyncHandler(deleteMyReview)