import { NextRequest } from "next/server";
import { createReviewSchema ,updateReviewSchema} from "../validations/review.schema";
import dbConnect from "../db/connectDB";
import { authenticate } from "../middleware/auth";
import Politician from "../models/Politician";
import { ApiError } from "../utils/apiError";
import Review from "../models/Review";
import { ApiResponse } from "../utils/apiResponse";
import { recalculatePoliticianRating } from "../services/review.services";
import { requireAdmin } from "../middleware/auth";

export async function createReview(req: NextRequest) {

    const user = await authenticate();

    await dbConnect();

    const body = await req.json();

    const validatedData =
        createReviewSchema.parse(body);

    const politician =
        await Politician.findById(
            validatedData.politician
        );

    if (!politician) {
        throw new ApiError(
            404,
            "Politician not found"
        );
    }

    const existingReview =
        await Review.findOne({
            user: user.userId,
            politician: politician._id
        });

    if (existingReview) {
        throw new ApiError(
            409,
            "You have already reviewed this politician"
        );
    }

    const review = await Review.create({
        ...validatedData,
        user: user.userId,
        electoralArea: politician.electoralArea
    });

    await recalculatePoliticianRating(
        politician._id
    );

    return ApiResponse.send(
        201,
        "Review created successfully",
        review
    );
}

export async function deleteMyReview(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await authenticate();

    await dbConnect();

    const { id } = await params;

    const review = await Review.findById(id);

    if (!review) {
        throw new ApiError(
            404,
            "Review not found"
        );
    }

    if (review.user.toString() !== user.userId.toString()) {
        throw new ApiError(
            403,
            "You can only delete your own review"
        );
    }

    const politicianId = review.politician;

    await Review.findByIdAndDelete(id);

    await recalculatePoliticianRating(
        politicianId
    );

    return ApiResponse.send(
        200,
        "Review deleted successfully",
        null
    );
}

export async function adminDeleteReview(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await requireAdmin();

    await dbConnect();

    const { id } = await params;

    const review = await Review.findById(id);

    if (!review) {
        throw new ApiError(
            404,
            "Review not found"
        );
    }

    const politicianId = review.politician;

    await Review.findByIdAndDelete(id);

    await recalculatePoliticianRating(
        politicianId
    );

    return ApiResponse.send(
        200,
        "Review deleted successfully",
        null
    );
}

export async function updateMyReview(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await authenticate();

    await dbConnect();

    const { id } = await params;

    const body = await req.json();

    const validatedData =
        updateReviewSchema.parse(body);

    const review = await Review.findById(id);

    if (!review) {
        throw new ApiError(
            404,
            "Review not found"
        );
    }

    if (
        review.user.toString() !==
        user.userId.toString()
    ) {
        throw new ApiError(
            403,
            "You can only update your own review"
        );
    }

    const updatedReview =
        await Review.findByIdAndUpdate(
            id,
            validatedData,
            {
                new: true,
                runValidators: true
            }
        );
    await recalculatePoliticianRating(
        review.politician
    );

    return ApiResponse.send(
        200,
        "Review updated successfully",
        updatedReview
    );
}