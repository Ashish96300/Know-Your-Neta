import { NextRequest } from "next/server";
import { requireAdmin } from "../middleware/auth";
import dbConnect from "../db/connectDB";
import { createElectionPromiseSchema, updateElectionPromiseSchema } from "../validations/promise.schema";
import Politician from "../models/Politician";
import { ApiError } from "../utils/apiError";
import ElectionPromise from "../models/Promise";
import { ApiResponse } from "../utils/apiResponse";
import { revalidateTag } from "next/cache";

export async function createPromise(req:NextRequest){

    await requireAdmin();
    await dbConnect();

    const body = await req.json();

    const validatedData =createElectionPromiseSchema.parse(body);

    const politician = await Politician.findById(validatedData.politician)

    if(!politician){
        throw new ApiError(404 , "No politician Found")
    }

    const newPromise = await ElectionPromise.create(validatedData)

    return ApiResponse.send(201 , "promise created" , newPromise);
}

export async function updatePromise(req:NextRequest ,{params}:{params:Promise<{id:string}>}){

    await requireAdmin();
    await dbConnect();

    const body = await req.json();
    const {id} = await params;

    const validatedData = updateElectionPromiseSchema.parse(body);

    const updatedPromise = await ElectionPromise.findByIdAndUpdate(id , validatedData,{
        new :true,
        runValidators:true,
    }).lean()

    if (!updatedPromise) {
    throw new ApiError(404, "Promise not found");
    }
    return ApiResponse.send(200 , "promise updated successfully" , updatedPromise)
}

export async function deletePromise(req:NextRequest ,{params}:{params:Promise<{id:string}>}) {
    
    await requireAdmin();
    await dbConnect();

    const {id} = await params;

    const deletedPromise = await ElectionPromise.findByIdAndDelete(id).lean();

        if (!deletedPromise) {
            throw new ApiError(404, "Promise not found");
        }
    
        revalidateTag("promises", { expire: 0 });
    
        return ApiResponse.send(200, "Promise deleted successfully", deletedPromise);
    }
