"use client"

import { Nav } from "@/components/nav";
import UserFront from "@/handlers/user";
import { useParams } from "next/navigation"
import { useState } from "react"
const CLOUD_NAME = "ddrymuqfl";  
const UPLOAD_PRESET = "dm_images";  


export default function Settings(){
    const [imageUrl, setImageUrl] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const { id } = useParams()

    const upload = async( value : string , field : string )=>{
      const uploadUserData = await UserFront.uploadUser( id as string , field , value )
      if( uploadUserData.ERROR ){
        console.log( "error" )
      } 
      else{
       console.log( "updated" )
      }
    } 

    const handleUpload = async ( event : any ) => {
        if (!file) return
    
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", UPLOAD_PRESET) // ← cambia esto
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        })
    
        const data = await res.json()
        if( !data.secure_url ){
         alert( "no image" )
        }
        else{
          console.log( event.target.id )
          if( event?.target.id === "large_photo" ){
            const value = data.secure_url
            const field = "large_photo"
            upload( value , field )
          }
          else{
            const value = data.secure_url
            const field = "profile_picture"
            upload( value , field )
          }
        }
      }

    return(
       <div style={ { display:"flex", flexDirection:"column" , width:"100%"} }>
        <Nav id={ id as string }/>
        <div className="settings_container">
         <div className="photo_settings">
          <input 
           id="photo_icon"
           className="photo"
           type="file" 
           accept="image/*" 
           onChange={(e) => setFile(e.target.files?.[0] || null)} 
         />
         <button id="photo_icon" onClick={ handleUpload }>Agregar</button>
         </div>
         <div className="photo_settings">
          <h1>Large photo</h1>
          <input 
           className="large_photo"
           type="file" 
           accept="image/*" 
           onChange={(e) => setFile(e.target.files?.[0] || null)} 
         />
         <button id="large_photo" onClick={ handleUpload }>Agregar</button>
         </div>
         <div className="nickname_settings">
          <input placeholder="Introduzca nuevo nickname"></input>
         </div>
         <div className="description_settings">
          <input placeholder="Introduzca nueva descripcion"></input>
         </div>
        </div>
       </div>
    )
}