import { connect } from "@/dbConfig/dbConfig";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();


export async function POST(req = NextRequest) {
    try {
         const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user =await User.findOne({email});

    if(!user){
        return NextResponse.json({message:"User not found"},{status:400});
    }
    console.log("user found",user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
        return NextResponse.json({message:"Invalid password"},{status:400});
    }
   
    const tokenData ={
        id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"})

   const response =  NextResponse.json({message:"Login successful",success:true},{status:200});
    
    response.cookies.set("token",token,{
        httpOnly:true
       
    })
    return response;

  
    } catch (error) {
         return NextResponse.json({ message: error.message }, { status: 500 });
    }
}