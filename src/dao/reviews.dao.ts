import usersModel from "./model/reviewsModel"
import { connectMongoDB } from "../dao/connection";
import { Review, UserInt } from "@/interfaces/user";

class UsersDao{
    constructor(){}
     
    async getUser( id : string  ){
      await connectMongoDB()
      return usersModel.findOne( { _id : id } )
    }

    async createReview( id : string , review : Review ){
      await connectMongoDB()
      review.date = new Date().toString()
      console.log( review )
      return await usersModel.updateOne( { _id : id } , { $push : { reviews : review } } )
    }

    async uploadUser( id : string , field : string , value : string ){
      await connectMongoDB()
      if( field !== "profile_picture" && field !== "description" && field !== "nickname" && field !== "large_photo" ){
        return { ERROR : "INVALID DATA" }
      }
      else{
        return await usersModel.updateOne( { _id : id } , { $set : { [ field ] : value } } )
      }
    }

    async register( user : UserInt ){
      await connectMongoDB()
      user.created_at = new Date().toString()
      return await usersModel.create( user ) 
    }

    async userByEmail( email : string ){
      await connectMongoDB()
      return await usersModel.findOne( { email : email } )
    }

    async verifyUser( nickname : string , email : string ){
      await connectMongoDB()
      return await usersModel.findOne( {   $or: [
        { nickname: nickname },
        { email: email }
      ]} )
    }

    async getFollowers( fids : [ string ] ){
      await connectMongoDB()
      return await usersModel.find({ _id: { $in: fids } },{ password: 0 , reviews : 0, large_photo : 0 , username : 0 , followers : 0 , __v: 0 , email : 0 })
    }
}

export default UsersDao