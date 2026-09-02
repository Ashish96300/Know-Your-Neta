import { cache } from "react";
import Politician from "@/lib/models/Politician";
import dbConnect from "@/lib/db/connectDB";

export const getPolitician=cache(async (id : string):Promise<unknown>=>{

    await dbConnect();

    return Politician.findById(id).populate("party")
    .populate({
        path: "electoralArea",
        populate: {
            path: "ancestors",
        },
    }).lean();
})