"use client"

import { useForm } from "react-hook-form"
import "../../styles/_register.scss"
import Image from "next/image"
import bcrypt from "bcryptjs"
import UserFront from "@/handlers/user"

export default function Register(){
    const { handleSubmit , register } = useForm()

    const handleRegister = async ( data : any )=>{
       if( data.password && data.password_2 ){
          const equal_passwords = data.password === data.password_2 ? true : false
          if( !equal_passwords ){
           alert("not equal passwords") 
          }
          else{
           const password = await bcrypt.hash( data.password , 10 )
           const user = {
            username : data.username,
            nickname : data.username,
            password : password,
            email : data.email,
           }
           const create = await UserFront.register( user )
           console.log( create )
           if( create.ERROR ){
            console.log( create.ERROR )
           }
           else if( create.MESSAGE ){
            window.location.href = "/"
           }
           else if( create.ERROR_NICK_EMAIL ){
            console.log("email o nickname existen")
           }
           else{
            console.log( "internal error server" )
           }
          }
       }
       else{
        alert("no")
       }
    }

    return(
        <div className="register">
         <form onSubmit={ handleSubmit( handleRegister ) }>
          <Image alt="pajaro" width={100} height={150} src="/bird.png" />
          <input placeholder="Nombre" required { ...register("username") }/>
          <input placeholder="Email" required { ...register("email") }/>
          <input placeholder="Contraseña" required { ...register("password") }/>
          <input placeholder="Validacion De Contraseña" required { ...register("password_2") }/>
          <input placeholder="Nickname" required { ...register("nickname") }/>
          <button type="submit">Registrarse</button>
         </form>
        </div>
    )
}