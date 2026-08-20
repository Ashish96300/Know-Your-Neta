// lib/utils/errorHandler.ts
import { NextResponse } from "next/server";
import { ApiError } from "./apiError";
import { ZodError } from "zod";

export function errorHandler(error: unknown) {
  // 1. ApiError Check (instanceof + duck typing fallback)
  if (
    error instanceof ApiError ||
    (typeof error === "object" &&
      error !== null &&
      "isOperational" in error &&
      "statusCode" in error)
  ) {
    const apiError = error as ApiError;
    return NextResponse.json(
      {
        success: false,
        message: apiError.message,
        errors: apiError.errors || [],
      },
      {
        status: apiError.statusCode || 400,
      }
    );
  }

  // 2. Zod Validation Error Check
  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json(
      {
        success: false,
        message: "validation error",
        errors: formattedErrors,
      },
      {
        status: 400,
      }
    );
  }

  // 3. Fallback Internal Server Error
  console.error("Unexpected error:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
      errors: [],
    },
    {
      status: 500,
    }
  );
}