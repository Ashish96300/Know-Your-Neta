import { createElectoralArea } from "@/lib/controllers/electoralArea.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(createElectoralArea)