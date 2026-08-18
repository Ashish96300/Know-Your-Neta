
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IElectoralArea extends Document {
    name: string;

    type:
        | "LokSabha"
        | "VidhanSabha"
        | "MunicipalWard"
        | "PanchayatWard";

    state: string;

    regionType: "State" | "UnionTerritory";

    district: string;

    number: number;

    parentArea?: mongoose.Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

const ElectoralAreaSchema: Schema<IElectoralArea> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            enum: [
                "LokSabha",
                "VidhanSabha",
                "MunicipalWard",
                "PanchayatWard"
            ],
            required: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        regionType: {
            type: String,
            enum: ["State", "UnionTerritory"],
            required: true
        },

        district: {
            type: String,
            required: true,
            trim: true
        },

        number: {
            type: Number,
            required: true
        },

        parentArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ElectoralArea"
        }
    },
    {
        timestamps: true
    }
);

const ElectoralArea: Model<IElectoralArea> =mongoose.models.ElectoralArea || mongoose.model<IElectoralArea>("ElectoralArea",ElectoralAreaSchema);

export default ElectoralArea;
