import { NextResponse } from "next/server";
import { ApiError } from "./apiError";

export function errorHandler(error: unknown) {

    if (error instanceof ApiError) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                errors: error.errors
            },
            {
                status: error.statusCode
            }
        );
    }
    console.error("Unexpected error:", error);

    return NextResponse.json(
        {
            success: false,
            message: "Internal Server Error",
            errors: []
        },
        {
            status: 500
        }
    );
}