import {createReview, updateMyReview} from "@/lib/controllers/review.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(createReview)
export const PATCH = asyncHandler(updateMyReview)
