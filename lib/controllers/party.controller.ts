import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import Party from "../models/Party";
import { createPartySchema ,updatePartySchema } from "../validations/party.schema";
import {NextRequest } from "next/server";
import dbConnect from "../db/connectDB";
import { revalidateTag } from "next/cache";
import { requireAdmin } from "../middleware/auth";

export async function createParty(req : NextRequest){

    await requireAdmin();
    await dbConnect();

    const body = await req.json();

    const validatedData = createPartySchema.parse(body);

    const existingParty = await Party.findOne({
        $or:[
            {name:validatedData.name},
            {abbreviation:validatedData.abbreviation}
        ]
    })
    if(existingParty){
        throw new ApiError(409 ,"party with same name or abbreviation already exists")
    }
    const newParty=await Party.create(validatedData)

    revalidateTag("parties","max") //this max is suspicious , check it on runtime if its throwing error

    return ApiResponse.send(201,"party created successfully" , newParty)

}   

export async function getAllParty() {
    
    await dbConnect();

    const parties = await Party.find().sort({name:1}).lean();

    return ApiResponse.send(200 ,"parties fetched successfully" ,parties)
}

export async function getPartyById(_req:NextRequest , {params} : {params : Promise<{id:string}>}) {
    
    await dbConnect();

    const {id} = await params;
    const party = await Party.findById(id).lean();

    if (!party) {
    throw new ApiError(404, "Party not found");
    }

     return ApiResponse.send(200, "Party fetched successfully", party);  
}

export async function deleteParty(_req:NextRequest , {params}:{params:Promise<{id:string}>}) {
    
    await requireAdmin();
    await dbConnect();

    const { id } = await params;
    const deletedParty = await Party.findByIdAndDelete(id).lean();

    if (!deletedParty) {
        throw new ApiError(404, "Party not found");
    }

    revalidateTag("parties", { expire: 0 });

    return ApiResponse.send(200, "Party deleted successfully", deletedParty);
}

export async function updateParty(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  await dbConnect();

  const { id } = await params;
  const body = await req.json();
  const validatedData = updatePartySchema.parse(body);

  if (validatedData.name || validatedData.abbreviation) {
    const conflict = await Party.findOne({
      _id: { $ne: id },
      $or: [
        ...(validatedData.name ? [{ name: validatedData.name }] : []),
        ...(validatedData.abbreviation ? [{ abbreviation: validatedData.abbreviation }] : []),
      ],
    });

    if (conflict) {
      throw new ApiError(409, "Another party with this name or abbreviation already exists");
    }
  }

  const updatedParty = await Party.findByIdAndUpdate(id, validatedData, {
    new: true,
    runValidators: true,
  }).lean();

  if (!updatedParty) {
    throw new ApiError(404, "Party not found");
  }

  revalidateTag("parties", { expire: 0 });

  return ApiResponse.send(200, "Party updated successfully", updatedParty);
}

