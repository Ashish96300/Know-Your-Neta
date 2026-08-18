import mongoose ,{Schema,Model,Document} from "mongoose";

interface IParty extends Document{

    name:string
    abbreviation: string
    logo:string
    description:string
    createdAt:Date
    updatedAt:Date
}   

const PartySchema : Schema<IParty> = new Schema(
    {   
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    abbreviation:{
        type:String,
        required:true,
        uppercase:true,
        unique:true,
    },
    logo:{
        type:String,
    },
    description:{
        type:String
    }
    },
    {
        timestamps:true
    }
);

const Party :Model<IParty> = mongoose.models.Party || mongoose.model<IParty>('Party' , PartySchema)

export default Party;