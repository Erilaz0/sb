"use client"

import UserFront from "@/handlers/user";
import { Review } from "@/interfaces/user";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"
import "../../../../styles/_create.scss"
import "../../../../styles/main.scss"
import Image from "next/image";
import { Nav } from "@/components/nav";

const CLOUD_NAME = "ddrymuqfl";  
const UPLOAD_PRESET = "dm_images";  

export default function Create(){
    const { register , handleSubmit } = useForm();
    const [imageUrl, setImageUrl] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const { id } = useParams()

    const handleUpload = async () => {
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
        alert( "imagen subida" )
        setImageUrl(data.secure_url)
      }
    }

   const handleReview = async ( event : any )=>{
    const review : Review = {
        genre: event.genre,
        score: event.score,
        favourite_character: event.favourite_character,
        physical_or_digital: event.physical_or_digital,
        public_or_private: event.public_or_private,
        description: event.description,
        title: event.title,
        number_pages: event.number_pages,
        emotion: event.emotion,
        thumbnail: imageUrl ,
      }
      console.log( review.thumbnail.length )
      if( imageUrl.length == 0 ){
        alert("error no agregaste imagen")
      }
      else{
        const create = await UserFront.createReview( id as string , review  )
        if( create.ERROR ){
         alert("error")
        }
        else if( create.MESSAGE ){
          alert("review creada")
        }
        else{
          alert("error server")
        }
      }
   }

   

 return(
  <div style={ { display:"flex", flexDirection:"column" , width:"100%"} }>
   <Nav id={ id as string }/>
   <div style={ { display:"flex", flexDirection:"column" , width:"100%"} }>
    <div className="form_container">
     <form className="review_form" onSubmit={handleSubmit( handleReview )}>
      <label htmlFor="photo_icon">
       <Image alt="add_photo_icon" src="/add_photo.png" width={80} height={80} />
      </label>
      <input 
         id="photo_icon"
         className="photo"
         style={ { display:"none" } }
         type="file" 
         accept="image/*" 
         onChange={(e) => setFile(e.target.files?.[0] || null)} 
       />

      <button 
         type="button" 
         onClick={handleUpload} 
         className="bg-green-500 text-white px-4 py-2 rounded"
       >
         Subir imagen
      </button>
      <input placeholder="Género" {...register("genre")} /> 
      <input placeholder="Puntaje (1-5)" type="number" max={5} min={1} {...register("score")} />
      <input placeholder="Personaje favorito" {...register("favourite_character")} />
      <label className="label" htmlFor="emotion">Libro Fisico o Digital?</label>
      <select id="option" {...register("physical_or_digital")}>
       <option value="Fisico">Físico</option>
       <option value="Digital">Digital</option>
      </select>
      <label htmlFor="check">
        ¿Review pública?
      <input id="check" type="checkbox" {...register("public_or_private")} />
      </label>
      <textarea placeholder="Descripción" {...register("description")} />
      <input placeholder="Título" {...register("title")} />
      <input placeholder="Número de páginas" type="number" {...register("number_pages")} />
      <label className="label" htmlFor="emotion">Que te hizo sentir?</label>
      <select id="option" {...register("emotion")} >
       <option value="feliz">😊 Feliz</option>
       <option value="triste">😢 Triste</option>
       <option value="enojado">😡 Enojado</option>
       <option value="sorprendido">😲 Sorprendido</option>
       <option value="asustado">😨 Asustado</option>
       <option value="confundido">😕 Confundido</option>
       <option value="caliente">🔥 Caliente</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
       Crear review
      </button>
     </form>
    </div> 
   </div>
  </div>
  )
} 