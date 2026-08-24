import { asyncHandler } from "@/lib/utils/asyncHandler";
import { dashboardTopPolitician } from "@/lib/controllers/politician.controller";


export const GET = asyncHandler(dashboardTopPolitician)