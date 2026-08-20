import { NextRequest } from "next/server";
import { requireAdmin } from "../middleware/auth";
import dbConnect from "../db/connectDB";
import { createElectoralAreaSchema, PARENT_TYPE_MAP } from "../validations/electoral.schema";
import ElectoralArea from "../models/ElectoralArea";
import { ApiError } from "../utils/apiError";
import { revalidateTag } from "next/cache";
import { ApiResponse } from "../utils/apiResponse";

export async function createElectoralArea(req : NextRequest) {
    
    await requireAdmin();
    await dbConnect();

    const body = await req.json();

    const validatedData = createElectoralAreaSchema.parse(body);

    if(validatedData.parentArea){

        const parent = await ElectoralArea.findById(validatedData.parentArea);

        if(!parent){
            throw new ApiError(404 , "parent electoral area not found")
        }

        const expectedParentType = PARENT_TYPE_MAP[validatedData.type]

        if(parent.type !== expectedParentType){
            throw new ApiError(400,
        `${validatedData.type} must have a ${expectedParentType} parent`)
        }
    }
    const newArea = await ElectoralArea.create({
        name: validatedData.name,
        type: validatedData.type,
        parentArea: validatedData.parentArea,
        number: validatedData.number,
    });

    revalidateTag("electoralAreas", "max");

    return ApiResponse.send(
        201,
        "Electoral area created successfully",
        newArea
    );
}