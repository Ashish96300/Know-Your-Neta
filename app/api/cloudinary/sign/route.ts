import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";
import { requireAdmin } from "@/lib/middleware/auth";

export async function POST(req: NextRequest) {

     await requireAdmin();

    const body = await req.json();

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: body.folder || "know-ur-neta",
        },
        process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
        signature,
        timestamp,
    });
}