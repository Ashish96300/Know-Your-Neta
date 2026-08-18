import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export type UserRole = "user" | "admin";

export interface SessionPayload {
    userId: string;
    role: UserRole;
}

export async function createSession(
    userId: string,
    role: UserRole
) {
    const token = await new SignJWT({
        userId,
        role
    })
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET_KEY);

    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24
    });
}

export async function verifySession(
    token: string | undefined
): Promise<SessionPayload | null> {

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(
            token,
            SECRET_KEY,
            {
                algorithms: ["HS256"]
            }
        );

        if (
            typeof payload.userId !== "string" ||
            (payload.role !== "user" &&
             payload.role !== "admin")
        ) {
            return null;
        }

        return {
            userId: payload.userId,
            role: payload.role
        };

    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();

    cookieStore.delete("auth_token");
}