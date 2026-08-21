import mongoose, {
    Model,
    Document,
    Schema
} from "mongoose";

export interface IReview extends Document {

    user: mongoose.Types.ObjectId;

    politician: mongoose.Types.ObjectId;

    electoralArea: mongoose.Types.ObjectId;

    overallRating: number;

    developmentRating: number;

    accessibilityRating: number;

    transparencyRating: number;

    infrastructureRating: number;

    comment?: string;

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

        electoralArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ElectoralArea",
            required: true
        },

        overallRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Overall rating must be a whole number"
            }
        },

        developmentRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Development rating must be a whole number"
            }
        },

        accessibilityRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Accessibility rating must be a whole number"
            }
        },

        transparencyRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Transparency rating must be a whole number"
            }
        },

        infrastructureRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
            validate: {
                validator: Number.isInteger,
                message: "Infrastructure rating must be a whole number"
            }
        },

        comment: {
            type: String,
            trim: true,
            maxlength: [
                1000,
                "Review cannot exceed 1000 characters"
            ]
        }
    },
    {
        timestamps: true
    }
);
ReviewSchema.index(
    {
        user: 1,
        politician: 1
    },
    {
        unique: true
    }
);

ReviewSchema.index({
    politician: 1,
    createdAt: -1
});
ReviewSchema.index({
    electoralArea: 1
});

const Review: Model<IReview> =
    mongoose.models.Review ||
    mongoose.model<IReview>(
        "Review",
        ReviewSchema
    );

export default Review;