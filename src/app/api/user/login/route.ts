import User from "@/services/users.service";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST( req : NextRequest ){

    const body = await req.json()
    if( !body.password && !body.email ){
     return NextResponse.json( { ERROR : "NOT ENOUGH DATA" } )
    }
    else{
     const registerUser = await User.userByEmail( body.email )
     if( !registerUser || registerUser === null && !registerUser.password ){
      return NextResponse.json( { ERROR_EMAIL : "EMAIL DOESN'T EXISTS" } )
     }
     else{
      const comparePasswd = await bcrypt.compare( body.password , registerUser.password )
      if( !comparePasswd ){
        return NextResponse.json( { ERROR_PASSWD : "CANNOT REGISTER USER INTERNAL ERROR SERVER" } )
      }
      else{
         const token = jwt.sign( { id: registerUser._id }, 
          process.env.SECRET_KEY || "1234" , 
          { expiresIn: '1d' }
         );
        
         const response = NextResponse.json( { MESSAGE: "200OK" , UID : registerUser._id } );
        
         response.headers.set(
          "Set-Cookie",
          `_userToken=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}` 
          );

         return response
       }
     } 
    }
}