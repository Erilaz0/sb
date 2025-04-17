import { Review, UserInt } from "@/interfaces/user";
import UsersDao from "../dao/reviews.dao"

class UsersServices{
    private dao;
    constructor( dao : any ){
       this.dao = dao
    }

    async getUser( id : string ){
      return this.dao.getUser( id )
    }

    async getFollowers( fids : [ string ] ){
      return this.dao.getFollowers( fids )
    }

    async createReview( id : string , review : Review ){
      return this.dao.createReview( id , review )
    }

    async register( user : UserInt ){
      return this.dao.register(  user )
    }

    async uploadUser( id : string , field : string , value : string ){
      return this.dao.uploadUser( id , field , value )
    }

    async userByEmail( email : string  ){
      return this.dao.userByEmail( email  )
    }

    async verifyUser( nickname : string , email: string ){
      return this.dao.verifyUser( nickname , email )
    }
}

const User = new UsersServices( new UsersDao() )
export default User;