import User from "@/services/users.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req : NextRequest ){

    const body = await req.json()
    if( !body.username && !body.nickname && !body.password && !body.email ){
     return NextResponse.json( { ERROR : "NOT ENOUGH DATA" } )
    }
    else{

     const verify = await User.verifyUser( body.nickname , body.email )
     console.log( verify )
     if( !verify ){
        const user = {
            username : body.username,
            nickname : body.username,
            password : body.password,
            email : body.email
         }
         const registerUser = await User.register( user )
         if( !registerUser ){
           return NextResponse.json( { ERROR : "CANNOT REGISTER USER INTERNAL ERROR SERVER" } )
         }
         else{
           return NextResponse.json( { MESSAGE : "USER CREATED" } )
         }
     }
     else{
        return NextResponse.json( { ERROR_NICK_EMAIL : "EMAIL OR NICKNAME ALREADY EXISTS" } )
     }
    }
}