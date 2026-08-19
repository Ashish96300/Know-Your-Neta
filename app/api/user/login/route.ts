import { asyncHandler } from "@/lib/utils/asyncHandler";
import { loginUser } from "@/lib/controllers/user.controller";

export const POST = asyncHandler(loginUser);