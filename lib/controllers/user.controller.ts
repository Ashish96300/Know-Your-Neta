import { RegisterUserInput , loginUserSchema ,registerUserSchema,userResponseSchema } from "../auth/schema";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { hashPassword , comparePassword } from "../auth/password";
import { NextRequest } from "next/server";
import User from "../models/User";
import dbConnect from "../db/connectDB";
import { createSession } from "../utils/jwt";

export async function registerUser(req : NextRequest) {
    
    await dbConnect();

    const body = await req.json();

    const validatedData = registerUserSchema.parse(body);

    const existingUser = await User.findOne({email:validatedData.email})

    if(existingUser){
        throw new ApiError(409 , "User with this email already exists")
    }

    const hashedPassword = await hashPassword(validatedData.password);
    
    const newUser = await User.create({
        name:validatedData.name,
        email:validatedData.email,
        password:hashedPassword,
        profilePicture:validatedData.profile,
        role:"user",
    });

    await createSession(newUser._id.toString() , newUser.role);

    const userPayload = {
        id:newUser._id.toString(),
        name:newUser.name,
        email:newUser.email,
        profilePicture:newUser.profilePicture,
        role:newUser.role,
        createdAt:newUser.createdAt,
    };

    return ApiResponse.send(201 , "user registered Successfully" , userPayload)
}

export async function loginUser(req:NextRequest) {

    await dbConnect();

    const body = await req.json()

    const validatedData = loginUserSchema.parse(body);

    const user = await User.findOne({
        email:validatedData.email
    }).select("+password");

    if(!user){
        throw new ApiError(401 ,"invalid email or password")
    }
    const isPasswordCorrect = comparePassword(validatedData.password , user.password)

    if(!isPasswordCorrect){
        throw new ApiError(401 , "invalid email or password")
    }

    await createSession(
        user?._id.toString(),
        user?.role
    )
    
    const userPayload = {
        id:user._id.toString(),
        name:user.name,
        email:user.email,
        profilePicture:user.profilePicture,
        role:user.role,
        createdAt:user.createdAt,
    };

    return ApiResponse.send(200 , "user loggedIn Successfully" , userPayload)
}

