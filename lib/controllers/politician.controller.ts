import { NextRequest } from "next/server";
import { requireAdmin } from "../middleware/auth";
import dbConnect from "../db/connectDB";
import { createPoliticianSchema ,updatePoliticianSchema} from "../validations/politician.schema";
import Party from "../models/Party";
import { ApiError } from "../utils/apiError";
import ElectoralArea from "../models/ElectoralArea";
import Politician from "../models/Politician";
import { ApiResponse } from "../utils/apiResponse";
import { revalidateTag } from "next/cache";

export async function createPolitician(req : NextRequest) {
    
    await requireAdmin();
    await dbConnect();

    const body = await req.json();

    const validatedData =createPoliticianSchema.parse(body);

    const party = await Party.findById(validatedData.party) 

    if(!party){
        throw new ApiError(404,"Party not found")
    }

    const electoralArea = await ElectoralArea.findById(validatedData.electoralArea)

    if(!electoralArea){
        throw new ApiError(404,"Electoral Area not found")
    }

   if (electoralArea.type === "State") {
    throw new ApiError(
        400,
        "Politician cannot belong to a State electoral area"
    );
   }
   if (
    electoralArea.type !== "LokSabha" &&
    electoralArea.type !== "VidhanSabha" &&
    electoralArea.type !== "MunicipalWard"
    ) {
        throw new ApiError(
            400,
            "Politician cannot belong to this electoral area type"
        );
    }
    const newPolitician = await Politician.create(validatedData);
    revalidateTag("politicians", "max");
    return ApiResponse.send(201 , "politician created sucessfully" , newPolitician)
}

export async function getAllPolitician() {
    await dbConnect();

    const politicians = await Politician.find()
        .populate("party", "name abbreviation logo")
        .populate({
            path: "electoralArea",
            select: "name type number",
            populate: {
                path: "ancestors",
                select: "name type number"
            }
        })
        .lean();

    return ApiResponse.send(200, "Politicians fetched successfully", politicians);
}
export async function getPoliticianById(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;

    const politician = await Politician
        .findById(id)
        .populate("party", "name abbreviation logo")
        .populate({
            path: "electoralArea",
            select: "name type number ancestors",
            populate: {
                path: "ancestors",
                select: "name type number"
            }
        })
        .lean();

    if (!politician) {
        throw new ApiError(404, "could not find politician");
    }

    return ApiResponse.send(200, "politician fetched successfully", politician);
}
export async function updatePolitician(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await requireAdmin();
    await dbConnect();

    const { id } = await params;

    // 1. Read request body
    const body = await req.json();

    // 2. Validate update data
    const validatedData =
        updatePoliticianSchema.parse(body);

    // 3. Check whether politician exists
    const existingPolitician =
        await Politician.findById(id);

    if (!existingPolitician) {
        throw new ApiError(
            404,
            "Politician not found"
        );
    }

    // 4. Validate party if it is being changed
    if (validatedData.party) {
        const party = await Party.findById(
            validatedData.party
        );

        if (!party) {
            throw new ApiError(
                404,
                "Party not found"
            );
        }
    }

    // 5. Validate electoral area if it is being changed
    if (validatedData.electoralArea) {

        const electoralArea =
            await ElectoralArea.findById(
                validatedData.electoralArea
            );

        if (!electoralArea) {
            throw new ApiError(
                404,
                "Electoral area not found"
            );
        }

        // State cannot directly represent a politician
        if (electoralArea.type === "State") {
            throw new ApiError(
                400,
                "Politician cannot belong to a State electoral area"
            );
        }

        // Only these electoral areas can be assigned
        if (
            electoralArea.type !== "LokSabha" &&
            electoralArea.type !== "VidhanSabha" &&
            electoralArea.type !== "MunicipalWard"
        ) {
            throw new ApiError(
                400,
                "Politician cannot belong to this electoral area type"
            );
        }
    }

    // 6. Update politician
    const updatedPolitician =
        await Politician.findByIdAndUpdate(
            id,
            validatedData,
            {
                new: true,
                runValidators: true
            }
        )
        .populate(
            "party",
            "name abbreviation logo"
        )
        .populate({
            path: "electoralArea",
            select: "name type number ancestors",
            populate: {
                path: "ancestors",
                select: "name type number"
            }
        })
        .lean();

    // Safety check
    if (!updatedPolitician) {
        throw new ApiError(
            404,
            "Politician not found"
        );
    }

    // 7. Revalidate cached politician data
    revalidateTag(
        "politicians",
        "max"
    );

    // 8. Return updated politician
    return ApiResponse.send(
        200,
        "Politician updated successfully",
        updatedPolitician
    );
}