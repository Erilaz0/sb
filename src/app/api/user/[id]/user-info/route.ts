import User from "@/services/users.service";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT( req : NextRequest ,   context : { params : { id : string } } ){
  const { id } = await context.params
  const body = await req.json()
  if( !id || !mongoose.isValidObjectId( id ) || !body || !body.field || !body.value ){
    return NextResponse.json( { ERROR : "CANNOT CREATE REVIEW, NOT ENOUGH DATA" } )
  }
  else{
   const create = await User.uploadUser( id , body.field , body.value )
   if( !create ){
    return NextResponse.json( { ERROR : "CANNOT CREATE REVIEW" } )
   }
   else{
    return NextResponse.json( { MESSAGE : "200OK" } )
   }
  }

}


export async function GET( req : NextRequest ,   context : { params : { id : string } } ){
  const { id } = await context.params

  if( !id || !mongoose.isValidObjectId( id ) ){
    return NextResponse.json( { ERROR : "TRY WITH A VALID ID" } )
  }
  else{
   const user = await User.getUser( id )
   const fids = user.followers.map( ( item : any ) => item.fid);
   if( !user || !fids ){
     return NextResponse.json( { ERROR : "CANNOT GET USER" } )
   }
   else{
    const getFollow = await User.getFollowers( fids )
    if( !getFollow ){
     return NextResponse.json( { ERROR : "CANNOT CREATE REVIEW" } )
    }
    else{
     return NextResponse.json( { MESSAGE : "200OK" , FOLLOWERS : getFollow } )
    }
   }
  }

}