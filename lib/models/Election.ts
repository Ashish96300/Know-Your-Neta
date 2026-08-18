
import mongoose, { Model, Document, Schema } from "mongoose";

interface IElectionCandidate {
    politician: mongoose.Types.ObjectId;
    votes: number;
    votePercentage: number;
    position: number;
}

interface IElection extends Document {
    year: number;

    electionType:
        | "LokSabha"
        | "VidhanSabha"
        | "Municipal"
        | "Panchayat";

    electoralArea: mongoose.Types.ObjectId;

    candidates: IElectionCandidate[];

    // Cached winner for fast lookup
    winner: mongoose.Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

const ElectionCandidateSchema: Schema<IElectionCandidate> =
    new Schema(
        {
            politician: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Politician",
                required: true
            },

            votes: {
                type: Number,
                required: true,
                min: 0
            },

            votePercentage: {
                type: Number,
                required: true,
                min: 0,
                max: 100
            },

            position: {
                type: Number,
                required: true,
                min: 1
            }
        },
        {
            _id: false
        }
    );

const ElectionSchema: Schema<IElection> = new Schema(
    {
        year: {
            type: Number,
            required: true,
            min: 1900
        },

        electionType: {
            type: String,
            enum: [
                "LokSabha",
                "VidhanSabha",
                "Municipal",
                "Panchayat"
            ],
            required: true
        },

        electoralArea: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ElectoralArea",
            required: true
        },

        candidates: {
            type: [ElectionCandidateSchema],
            required: true,

            validate: {
                validator: (candidates: IElectionCandidate[]) =>
                    candidates.length > 0,

                message: "An election must have at least one candidate"
            }
        },

        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Politician",
            required: true
        }
    },
    {
        timestamps: true
    }
);


// Prevent duplicate elections for the same
// electoral area, year and election type
ElectionSchema.index(
    {
        electoralArea: 1,
        year: 1,
        electionType: 1
    },
    {
        unique: true
    }
);


// Useful when filtering elections by type
ElectionSchema.index({
    electionType: 1
});


// Make sure the winner is one of the candidates
ElectionSchema.pre("save", function () {

    const winnerExists = this.candidates.some(
        (candidate) =>
            candidate.politician.toString() ===
            this.winner.toString()
    );

    if (!winnerExists) {
        throw new Error(
            "Winner must be one of the election candidates"
        );
    }
});


const Election: Model<IElection> =
    mongoose.models.Election ||
    mongoose.model<IElection>("Election", ElectionSchema);

export default Election;
