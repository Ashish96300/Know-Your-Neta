import { asyncHandler } from "@/lib/utils/asyncHandler";
import {
  getPartyById,
  updateParty,
  deleteParty,
} from "@/lib/controllers/party.controller";

export const GET = asyncHandler(getPartyById);
export const PATCH = asyncHandler(updateParty);
export const DELETE = asyncHandler(deleteParty);