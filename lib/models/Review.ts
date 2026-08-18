
import mongoose, { Model, Document, Schema } from "mongoose";

interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    politician: mongoose.Types.ObjectId;

    overallRating: number;
    developmentRating: number;
    accessibilityRating: number;
    transparencyRating: number;
    infrastructureRating: number;

    comment: string;
    electoralArea:mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        politician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Politician",
            required: true
        },

        overallRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        developmentRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        accessibilityRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        transparencyRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        infrastructureRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            trim: true,
            maxlength: [1000, "Review cannot exceed 1000 characters"]
        },
        electoralArea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ElectoralArea",
        required: true
        }
    },
    {
        timestamps: true
    }
);

ReviewSchema.index(
    { user: 1, politician: 1 },
    { unique: true }
);

const Review: Model<IReview> =
    mongoose.models.Review ||
    mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
