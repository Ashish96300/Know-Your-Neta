import mongoose, { Document, Model, Schema } from "mongoose";

export interface IElectoralArea extends Document {
    name: string;

    type: "State" | "LokSabha" | "VidhanSabha" | "MunicipalWard";

    parentArea?: mongoose.Types.ObjectId;
    ancestors: mongoose.Types.ObjectId[];
    number?: number;

    createdAt: Date;
    updatedAt: Date;
}

const ElectoralAreaSchema: Schema<IElectoralArea> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: [
                "State",
                "LokSabha",
                "VidhanSabha",
                "MunicipalWard",
            ],
            required: true,
        },

        parentArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ElectoralArea",
            default: null,
        },

        ancestors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "ElectoralArea",
        default: []
        },

        number: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

ElectoralAreaSchema.index({ parentArea: 1 });

const ElectoralArea: Model<IElectoralArea> =
    mongoose.models.ElectoralArea ||
    mongoose.model<IElectoralArea>(
        "ElectoralArea",
        ElectoralAreaSchema
    );

export default ElectoralArea;