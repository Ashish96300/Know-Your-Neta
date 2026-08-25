import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";
import { requireAdmin } from "@/lib/middleware/auth";

// export async function POST(req: NextRequest) {
//     await requireAdmin();

//     const body = await req.json();

//     const { timestamp, ...params } = body;

//     const signature = cloudinary.utils.api_sign_request(
//         {
//             ...params,
//             timestamp,
//         },
//         process.env.CLOUDINARY_API_SECRET!
//     );

//     return NextResponse.json({
//         signature,
//     });
// }

export async function POST(req: NextRequest) {
    await requireAdmin();

    const body = await req.json();
    console.log("FULL BODY:", JSON.stringify(body, null, 2));

    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ signature });
}