import { registerUser } from "@/lib/controllers/user.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(registerUser)
