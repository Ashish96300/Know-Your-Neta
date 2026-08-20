import { asyncHandler } from "@/lib/utils/asyncHandler";
import { getAllParty, createParty } from "@/lib/controllers/party.controller";

export const GET = asyncHandler(getAllParty);
export const POST = asyncHandler(createParty);