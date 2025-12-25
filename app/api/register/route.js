import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/userSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req){
    try{
    await connectDB();
    const { name, email, password } = await req.json();
    if(!name || !email || !password){
        return NextResponse.json({message:"All fields are required"}, {status:400});
    }
    const user=await User.findOne({email});
    if(user){
        return NextResponse.json({message:"User already exists"}, {status:400});
    }
    const hashedPass=await bcrypt.hash(password,12);
    const newUser=new User({
        name,email,password:hashedPass
    });
    await newUser.save();
    return NextResponse.json({message:"User Registered Successfully"},{status:201});
}catch(error){
    return NextResponse.json({message:"Internal Server Error"},{status:500});
}
}