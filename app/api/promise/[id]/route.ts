import { updatePromise } from "@/lib/controllers/promise.schema";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const PATCH = asyncHandler(updatePromise)