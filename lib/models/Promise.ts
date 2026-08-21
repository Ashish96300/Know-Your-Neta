
import mongoose, { Model, Document, Schema } from "mongoose";

interface IElectionPromise extends Document {
    politician: mongoose.Types.ObjectId;

    title: string;
    description?: string;

    date: Date;

    source: string;

    status:
        | "Promised"
        | "In Progress"
        | "Completed"
        | "Not Completed";

    completionDate?: Date;

    createdAt: Date;
    updatedAt: Date;
}

const ElectionPromiseSchema: Schema<IElectionPromise> = new Schema(
    {
        politician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Politician",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        source: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^https?:\/\/.+/,
                "Please provide a valid source URL"
            ]
        },

        status: {
            type: String,
            enum: [
                "Promised",
                "In Progress",
                "Completed",
                "Not Completed"
            ],
            default: "Promised"
        },

        completionDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

ElectionPromiseSchema.index({ politician: 1 });

ElectionPromiseSchema.index({ status: 1 });

const ElectionPromise: Model<IElectionPromise> =
    mongoose.models.ElectionPromise ||
    mongoose.model<IElectionPromise>(
        "ElectionPromise",
        ElectionPromiseSchema
    );

export default ElectionPromise;
