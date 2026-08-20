
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./errorHandler";

export interface RouteContext<TParams = Record<string, string | string[]>> {
  params?: Promise<TParams>;
}

export type AsyncRouteHandler<TContext extends RouteContext = RouteContext> = (
  req: NextRequest,
  context: TContext
) => Promise<NextResponse | Response>;

export function asyncHandler<TContext extends RouteContext = RouteContext>(
  fn: AsyncRouteHandler<TContext>
) {
  return async (req: NextRequest, context: TContext) => {
    try {
      return await fn(req, context);
    } catch (error: unknown) {
      return errorHandler(error);
    }
  };
}