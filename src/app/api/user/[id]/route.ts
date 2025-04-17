import User from "../../../../services/users.service";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req : NextRequest, context: { params: { id: string } } ){

   const { id } = await context.params;
 
    if( !id || !mongoose.isValidObjectId( id ) ){
      return NextResponse.json( { ERROR : "INVALID_ID" } )
    }
    else{
     const user = await User.getUser( id )
     if( !user ){
        return NextResponse.json( { ERROR : "CANNOT GET USER" } )
     }
     else{
        return NextResponse.json( { USER : user } )
     }
    }
}