import { NextResponse } from "next/server";
import { ApiError } from "./apiError";
import { success, ZodError } from "zod";

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
    if(error instanceof ZodError){
        const formattedErrors = error.issues.map((issue)=>({
            field:issue.path.join("."),
            message:issue.message,
        }));

        return NextResponse.json(
            {
                success:false,
                message:"validation error",
                errors:formattedErrors,
            },
            {
                status:400,
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