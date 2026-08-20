import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/auth";
import { ApiResponse } from "@/lib/utils/apiResponse";
import { errorHandler } from "@/lib/utils/errorHandler";

export async function GET() {
    try {
        const admin = await requireAdmin();

        return NextResponse.json(
            ApiResponse.send(
                200,
                "Admin access granted",
                admin
            )
        );

    } catch (error) {
        return errorHandler(error);
    }
}