import { createPolitician, getAllPolitician } from "@/lib/controllers/politician.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(createPolitician)
export const GET = asyncHandler(getAllPolitician)