import { Review, UserInt } from "@/interfaces/user"

const host = "http://localhost:3000"

class UserClass{
    constructor(){}

    async getUser( id : string ){
        const request = await fetch( `${host}/api/user/${id}` )
        const response = request.json()
        return response
    }

    async createReview( id : string , review : Review ){
        const request = await fetch( `${host}/api/user/${id}/review`, {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify( review )
        })
        const response = request.json()
        return response
    }


    async uploadUser( id : string , field : string , value : string ){
        const body = { 
            field : field,
            value: value
        }
        const request = await fetch( `${host}/api/user/${id}/user-info`, {
            method : "PUT",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify( body )
        })
        const response = request.json()
        return response
    }

    async get_Followers( id : string ){
        const request = await fetch( `${host}/api/user/${id}/user-info`, {
            method : "GET",
            headers : { "Content-Type" : "application/json" },
        })
        const response = request.json()
        return response
    }

    async register( user : UserInt ){

        const request = await fetch( `${host}/api/user/create`, {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify( user )
        })
        const response = request.json()
        return response
    }

    async login( email : string , password : string ){
        const data = {
            email,
            password
        }

        const request = await fetch( `${host}/api/user/login`, {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify( data )
        })
        const response = request.json()
        return response
    }
    
}
const UserFront = new UserClass()
export default  UserFront