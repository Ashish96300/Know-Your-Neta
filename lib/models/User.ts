
import mongoose ,{Schema , Document , Model, } from "mongoose";

interface IUser extends Document{
    name:string
    email:string
    password:string
    role:'user'|'admin'
    createdAt:Date
    updatedAt:Date
}

const UserSchema : Schema<IUser> = new Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required'],
            trim:true
        },
        email:{
            type:String,
            required:[true,"email is required"],
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
            select: false
        },
        role:{
            type:String,
            enum:['user' , 'admin'],
            default:'user'
        },
    },
    {
    timestamps:true
    }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User' , UserSchema)

export default User