import { connectDB } from "@/app/lib/db";
import {User} from "@/app/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req){
    await connectDB();
    const {email,password} = await req.json();
    if(!email || !password){
        return NextResponse.json({message:"Email and Password are required"}, {status:400});
    }
    const user = await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"Invalid Credentials"},{status:401});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return NextResponse.json({message:"Invalid Password"},{status:401});
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'2h'});
    await cookies().set({name:"token", value:token, httpOnly:true, maxAge:2*60*60,path:"/"});
    return NextResponse.json({message:"Login Successful"},{status:200});
}