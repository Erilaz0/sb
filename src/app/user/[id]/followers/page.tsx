"use client"

import UserFront from "@/handlers/user"
import { Follower } from "@/interfaces/user"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import "../../../../styles/_followers.scss"
import { Nav } from "@/components/nav"


export default function Followers(){
    const { id } = useParams()
    const [ foll , setFoll ] = useState<Follower[]>([])

    useEffect(()=>{
      const getFllowersFunction = async ()=>{
        const getFollowers = await UserFront.get_Followers( id as string )
        if( getFollowers.ERROR ){
         console.log( getFollowers )
        }
        else{
            console.log( getFollowers )
         setFoll( getFollowers.FOLLOWERS )
        }
    }
    getFllowersFunction()
    },[])

    return(
        <div>
         <Nav id={ id as string }/>
         <div className="followers_cont">
          {
            foll.length > 0 ? foll.map( ( item : Follower )=>
             <div className="follower_item" key={item._id}>
              <Image alt="user_photo" src={ item.profile_picture !== "none" ? item.profile_picture : "/user_icon.png" } width={50} height={50}/>
              <p>{ item.nickname }</p>
              <button>
                <Image alt="user" src="/user_icon.png" width={15} height={15}/>
                Perfil
                </button>
             </div>
            ) : "Loading..."
          }
         </div>
        </div>
    )
}