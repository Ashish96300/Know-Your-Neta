import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./errorHandler";

type AsyncRouteHandler = (
  req: NextRequest,
  context?: unknown
) => Promise<NextResponse | Response>;

export function asyncHandler(fn: AsyncRouteHandler) {
  return async (req: NextRequest, context?: unknown): Promise<NextResponse | Response> => {
    try {
      return await fn(req, context);
    } catch (error) {
      return errorHandler(error);
    }
  };
}