import { asyncHandler } from "@/lib/utils/asyncHandler"
import { adminDeleteReview } from "@/lib/controllers/review.controller"

export const DELETE = asyncHandler(adminDeleteReview)