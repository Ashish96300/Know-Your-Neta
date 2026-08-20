import { deleteElectoralArea, getElectoralAreaByID, updateElectoralArea } from "@/lib/controllers/electoralArea.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const GET = asyncHandler(getElectoralAreaByID)
export const PATCH  = asyncHandler(updateElectoralArea)
export const DELETE = asyncHandler(deleteElectoralArea)