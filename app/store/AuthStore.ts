
import {create} from "zustand";

interface User{
    name:string
    email:string
    password:string
    profilePicture?:string
    role:'user'|'admin'
}

interface AuthState{

    user:User|null
    setUser:(user:User)=>void
    logout:()=>void
}

export const useAuthStore = create<AuthState>((set)=>({

    user:null,

    setUser:(user)=>set({user}),
    logout:()=>set({user:null})
}))