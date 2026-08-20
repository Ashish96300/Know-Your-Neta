import { asyncHandler } from "@/lib/utils/asyncHandler";
import { logoutUser } from "@/lib/controllers/user.controller";

export const POST = asyncHandler(logoutUser);