"use client"

import { useForm } from "react-hook-form";
import User from "../handlers/user"
import Swal from 'sweetalert2';
import Image from "next/image";

export default function Home() {
  const { handleSubmit , register } = useForm()

  const login = async ( data )=>{
    if( !data.email && !data.password ){
      Swal.fire({
        title: "Rellena el formulario",
        showCancelButton: true,
        icon:"error",
        confirmButtonText: "Aceptar",
      })
    }
    else{
      const auth = await User.login( data.email , data.password )
      console.log( auth )
      if( auth.ERROR_EMAIL ){
       Swal.fire({
           title: "Email No Existe",
           showCancelButton: true,
           icon:"error",
           confirmButtonText: "Aceptar",
         })
      }
      else if( auth.ERROR_PASSWD ){
        Swal.fire({
          title: "Email Incorrecto",
          showCancelButton: true,
          icon:"error",
          confirmButtonText: "Aceptar",
        })
      }
      else if( auth.MESSAGE ){
        window.location.href = `/user/${auth.UID}` 
      }
      else{
        Swal.fire({
          title: "Internal Server Error",
          showCancelButton: true,
          icon:"error",
          confirmButtonText: "Aceptar",
        })
      }

    }
  }


  return (
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(to right, #fce4ec, #f8bbd0)',
  fontFamily: 'Segoe UI, sans-serif',
  margin: "0%",
}}>
  <form onSubmit={ handleSubmit( login ) } style={{
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '320px',
    minWidth: "200px",
    display: 'flex',
    margin: "20px",
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <Image 
      src="/tilogo.png"
      alt="Logo"
      width={ 80 }
      height={ 80 }
      style={{
        marginBottom: '1rem',
        objectFit: 'contain',
        borderRadius: '50%'
      }}/>
    <h2 style={{
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#e91e63'
    }}>
      Iniciar Sesión
    </h2>
    <input
      placeholder="Email:"
      type="text"
      style={{
        width: '100%',
        padding: '0.8rem',
        marginBottom: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '0.8rem',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box'
      }}
      { ...register("email") }/>
    <input
      placeholder="Contraseña:"
      type="text"
      style={{
        width: '100%',
        padding: '0.8rem',
        marginBottom: '1.5rem',
        border: '1px solid #e0e0e0',
        borderRadius: '0.8rem',
        fontSize: '1rem',
        outline: 'none',
        boxSizing: 'border-box'
      }}
      { ...register("password") }/>
    <button
      type="submit"
      style={{
        width: '100%',
        padding: '0.8rem',
        backgroundColor: '#e91e63',
        color: 'white',
        border: 'none',
        borderRadius: '0.8rem',
        fontSize: '1rem',
        cursor: 'pointer'
      }}
    >
      Entrar
    </button>
  </form>
</div>

  );
}
