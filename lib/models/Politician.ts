//need improvment in future

import mongoose, { Model, Document, Schema } from "mongoose";

interface IPolitician extends Document {
    name: string;
    photo?: string;

    party: mongoose.Types.ObjectId;
    electoralArea: mongoose.Types.ObjectId;

    education?: string;
    profession?: string;
    politicalCareer?: string;

    assets?: number;
    liabilities?: number;

    criminalCaseCount: number;

    achievements?: string;

    status: "active" | "former";

    averageRating: number;
    reviewCount: number;

    currentTermStartYear?: number;
    termStatus: "current" | "past";
    
    createdAt: Date;
    updatedAt: Date;
}

const PoliticianSchema: Schema<IPolitician> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        photo: {
            type: String
        },

        party: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Party",
            required: true
        },

        electoralArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ElectoralArea",
            required: true
        },

        education: {
            type: String,
            trim: true
        },

        profession: {
            type: String,
            trim: true
        },

        politicalCareer: {
            type: String,
            trim: true
        },

        assets: {
            type: Number,
            min: 0
        },

        liabilities: {
            type: Number,
            min: 0
        },

        criminalCaseCount: {
            type: Number,
            min: 0,
            default: 0
        },

        achievements: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: ["active", "former"],
            default: "active"
        },

        averageRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },

        reviewCount: {
            type: Number,
            min: 0,
            default: 0
        },
        currentTermStartYear: {
        type: Number,
        min: 1900
        },

        termStatus: {
        type: String,
        enum: ["current", "past"],
        default: "current"
        },
    },
    {
        timestamps: true
    }
);

PoliticianSchema.index({ electoralArea: 1 });

const Politician: Model<IPolitician> =
    mongoose.models.Politician ||
    mongoose.model<IPolitician>("Politician", PoliticianSchema);

export default Politician;
