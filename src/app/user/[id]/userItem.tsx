"use client"

import Image from "next/image"
import { Review, UserInt } from "../../../interfaces/user"
import { useParams } from "next/navigation";
import Stars from "./stars";
import { Nav } from "@/components/nav";


export default function UserItem( { user } : { user : UserInt } ){
  const { id } = useParams()

   return( 
    <div style={ { display:"flex", flexDirection:"column" , width:"100%"} }>
    <Nav id={ id as string }/>
     <div id={ user._id } className="user_item">
       <div className="config_and_photo" style={ user.large_photo ? { backgroundImage: `url(${ user.large_photo })` } : { backgroundImage: `url(/no_user.png)` } }>
        <Image style={ { cursor: "pointer" } } className="camera" alt="camera" width={36} height={35} src="/camera_icon.png" onClick={ ()=>{ window.location.href = `/user/${id}/settings` } }/>
        <img alt="profile_picture" className="profile" width={200} height={200} src={ user.profile_picture !== "none" ? user.profile_picture : "/no_user.png" }/>
        <div className="dropdown">
          <Image style={ { cursor: "pointer" } } className="config" alt="config_icon" width={30} onClick={ ()=>{ window.location.href = `/user/${id}/settings` } } height={30} src="/camera_icon.png"/>
        </div>
        <h1>{ user.nickname && user.nickname.length > 12 ? "block" : user.nickname }</h1>
       </div>
       <div className="info">
       <div className="data">
        <div className="data_icon_cont">
         <div className="data_icon">
          <p>{ user.followers && user.followers.length > 0 ? user.followers.length : 0 }</p>
          <Image alt="icon" width={20} height={20} src="/user_icon.png"/>
         </div>
         <div className="data_icon">
          <p>{ user.followers && user.followers.length > 0 ? user.followers.length : 0 }</p>
          <Image alt="icon" width={25} height={20} src="/feather_icon.png"/>
         </div>
         <div className="data_icon">
          <p> { user.reviews && user.reviews.length > 0 ? user.reviews.length : 0 }</p>
         <Image alt="icon" width={25} height={20} src="/review_icon.png"/>
         </div>
        </div>
        </div>
       <p className="description">
        { 
          user.description
        }
       </p>
       <div className="buttons">
        <div className="buttons_cont">
         <button onClick={ ()=>{ window.location.href = `/user/${id}/create` } } className="rev">Crear Review +</button>
         <button onClick={ ()=>{ window.location.href = `/user/${id}/followers` } }  className="lectores">
          <Image alt="lentes" src="/lentes.png" width={23} height={10}/>
           Lectores
         </button>
         <button onClick={ ()=>{ window.location.href = `/user/${id}/settings` } }>
          <Image alt="engranaje" width={20} height={20} src="/engranaje.png"/>
         </button>
        </div>
       </div>
       </div>
       <div className="reviews_cont">
        {
          user.reviews && user.reviews.length > 0 ? user.reviews.map( ( rev : Review )=>
           <div key={ rev._id } className="review">
             <img alt="review_image" className="review_image" src={ rev.thumbnail && rev.thumbnail.length > 0 && rev.thumbnail !== "none" ? rev.thumbnail : "/no_user.png"  }/>
             <Stars number={ rev.score } />
           </div>
          )
          :
          <div style={ { height: "500px" } }>

          </div>
        }
       </div>
     </div>
    </div>
   )
}