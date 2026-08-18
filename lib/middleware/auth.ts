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

async function requireAdmin(): Promise<AuthUser> {
    const user = await authenticate();

    if (user.role !== "admin") {
        throw new ApiError(
            403,
            "Admin access required"
        );
    }

    return user;
}

export {authenticate , requireAdmin}