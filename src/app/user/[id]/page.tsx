"use client"

import UserFront from "@/handlers/user"
import { UserInt } from "@/interfaces/user"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import UserItem from "./userItem"
import "../../../styles/main.scss"

export default function User(){
    const [ user , setUser ] = useState<UserInt>()
    const { id } = useParams()
    
    useEffect(()=>{
     const getUser = async ()=>{
        const user_data = await UserFront.getUser( id as string )  
        if( !user_data ){
            alert("no user")
        }
        else{
          setUser( user_data.USER )
        }
    }
     getUser()
    },[])
    return(
        <div className="user_container">
         { user && user.nickname ? <UserItem user={ user } /> : "Loading..." }
        </div>
    )
}