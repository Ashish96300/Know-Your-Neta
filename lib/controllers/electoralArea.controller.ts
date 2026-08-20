import { NextRequest } from "next/server";
import { requireAdmin } from "../middleware/auth";
import dbConnect from "../db/connectDB";
import { createElectoralAreaSchema, PARENT_TYPE_MAP ,updateElectoralAreaSchema } from "../validations/electoral.schema";
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

export async function getAllElectoralAreas() {
    
    await dbConnect();

    const electoralArea = await ElectoralArea.find().sort({ type: 1, number: 1 });;

    return ApiResponse.send(200 , "elctoral areas fetched" ,electoralArea);
    
}

export async function getElectoralAreaByID(req:NextRequest ,{params}:{params:Promise<{id:string}>}) {
    
    await dbConnect();

    const {id} = await params;
    const electoralArea = await ElectoralArea.findById(id);

    if(!electoralArea){
        throw new ApiError(404 ,"no electoral area");
    }

    return ApiResponse.send(200 , "electoral area get successfully" , electoralArea);

}

export async function updateElectoralArea( req: NextRequest, { params }: { params: Promise<{ id: string }>}) {

    await requireAdmin();
    await dbConnect();

    const { id } = await params;

    const body = await req.json();

    const validatedData = updateElectoralAreaSchema.parse(body);

    const existingArea = await ElectoralArea.findById(id);

    if (!existingArea) {
        throw new ApiError(
            404,
            "Electoral area not found"
        );
    }

    if (validatedData.name) {

        const conflict =
            await ElectoralArea.findOne({
                name: validatedData.name,
                _id: { $ne: id }
            });

        if (conflict) {
            throw new ApiError(
                409,
                "Electoral area with this name already exists"
            );
        }
    }

    const finalType = validatedData.type ?? existingArea.type;

    const finalParent =
        validatedData.parentArea ??
        existingArea.parentArea;

    if (finalType === "State" && finalParent) {
        throw new ApiError(
            400,
            "State cannot have a parent area"
        );
    }

    if (finalParent) {

        const parent =
            await ElectoralArea.findById(finalParent);

        if (!parent) {
            throw new ApiError(
                404,
                "Parent electoral area not found"
            );
        }
        if (finalParent && finalParent.toString() === id) {
         throw new ApiError(400, "An area cannot be its own parent");
        }

        const expectedParentType =
            PARENT_TYPE_MAP[finalType];

        if (parent.type !== expectedParentType) {
            throw new ApiError(
                400,
                `${finalType} must have a ${expectedParentType} parent`
            );
        }
    }

    const updatedElectoralArea =
        await ElectoralArea.findByIdAndUpdate(
            id,
            validatedData,
            {
                new: true,
                runValidators: true,
            }
        );

    revalidateTag(
        "electoralAreas",
        "max"
    );

    return ApiResponse.send(
        200,
        "Electoral area updated successfully",
        updatedElectoralArea
    );
}

export async function deleteElectoralArea(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await requireAdmin();

    await dbConnect();

    const { id } = await params;

    const electoralArea = await ElectoralArea.findById(id);

    if (!electoralArea) {
        throw new ApiError(
            404,
            "Electoral area not found"
        );
    }

    const hasChildren = await ElectoralArea.exists({
        parentArea: id,
    });

    if (hasChildren) {
        throw new ApiError(
            409,
            "Cannot delete electoral area because it has child areas"
        );
    }

    await ElectoralArea.findByIdAndDelete(id);

    revalidateTag("electoralAreas", "max");

    return ApiResponse.send(
        200,
        "Electoral area deleted successfully",
        null
    );
}