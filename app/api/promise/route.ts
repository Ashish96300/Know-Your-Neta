import { createPromise } from "@/lib/controllers/promise.schema";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(createPromise)