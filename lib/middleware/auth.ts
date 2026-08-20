//user is logged in or not , first check if its session valid using jwt/verifySession if ,yes return id ad role,

import { cookies } from "next/headers";
import { verifySession } from "../utils/jwt";
import { ApiError } from "../utils/apiError";

export interface AuthUser{
    userId:string,
    role:"user"|"admin";
}

async function authenticate():Promise<AuthUser> {
    
    const cookieStore = await cookies();

    const token = await cookieStore.get("auth_token")?.value;

    if(!token){
        throw new ApiError(
            401,
            "Authentication required"
        )
    }

    const payload = await verifySession(token);

    if(!payload || !payload.userId || !payload.role){
        throw new ApiError(
            401,
            "invalid or expired authentication token"
        );
    }

    return {
        userId : payload.userId as string,
        role:payload.role as "user"|"admin"
    }
}
//admin compulsory route,use this

async function requireAdmin() {
    const { userId, role } = await authenticate();

    if (role !== "admin") {
        throw new ApiError(403, "Admin access required");
    }

    return {
        userId,
        role,
    };
}

export {authenticate , requireAdmin}