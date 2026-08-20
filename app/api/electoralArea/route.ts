import { createElectoralArea, getAllElectoralAreas } from "@/lib/controllers/electoralArea.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(createElectoralArea)
export const GET = asyncHandler(getAllElectoralAreas)