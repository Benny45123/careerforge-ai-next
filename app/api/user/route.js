import User from "@/app/models/userSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
    const userId=req.user.id;
    const user=await User.findById(userId).select('-password');
    if(!user){
        return NextResponse.json({message:"User not found"},{status:404});
    }
    return NextResponse.json({user},{status:200});
    }catch(error){
        return NextResponse.json({message:"Internal Server Error"},{status:500});
    }

}