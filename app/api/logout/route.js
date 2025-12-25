import { NextResponse } from "next/server";

export async function POST(req){
    try{
    const res = NextResponse.json({message:"Logged Out Successfully"},{status:200});
    res.cookies.set({
        name:"token",
        value:"",
        httpOnly:true,
        path:"/",
        maxAge:0
    });
    return res;
}catch(error){
    return NextResponse.json({message:"Internal Server Error"},{status:500});
}
}