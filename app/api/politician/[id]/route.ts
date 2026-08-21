import { getPoliticianById } from "@/lib/controllers/politician.controller";
import { asyncHandler } from "@/lib/utils/asyncHandler";


export const GET = asyncHandler(getPoliticianById)