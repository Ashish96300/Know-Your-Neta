export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    profile:string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    profile:string;
    role: "user" | "admin";
}