import Politician from "../models/Politician";
import Review from "../models/Review";
import mongoose from "mongoose";

export async function recalculatePoliticianRating(politicianId: mongoose.Types.ObjectId):Promise<void> {
    const ratingStats = await Review.aggregate([
        { $match: { politician: politicianId } },
        { $group: { _id: null, averageRating: { $avg: "$overallRating" }, reviewCount: { $sum: 1 } } }
    ]);

    const stats = ratingStats[0];

    await Politician.findByIdAndUpdate(politicianId, {
        averageRating: stats ? Number(stats.averageRating.toFixed(2)) : 0,
        reviewCount: stats ? stats.reviewCount : 0
    });
}

