import User from "@/services/users.service";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req : NextRequest ,   context : { params : { id : string } } ){
  const { id } = await context.params
  const body = await req.json()
  if( !id || !mongoose.isValidObjectId( id ) || !body ){
    return NextResponse.json( { ERROR : "CANNOT CREATE REVIEW, NOT ENOUGH DATA" } )
  }
  else{
   const create = await User.createReview( id , body )
   if( !create ){
    return NextResponse.json( { ERROR : "CANNOT CREATE REVIEW" } )
   }
   else{
    return NextResponse.json( { MESSAGE : "200OK" } )
   }
  }

}