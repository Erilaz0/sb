"use client"

import Image from "next/image"
import "../styles/_nav.scss"

export function Nav( { id } : { id : string } ){

      const handleRedirect= async ( path : string )=>{
        window.location.href = path
      }
    return(
        <header>
         <Image alt="logo" style={ { marginLeft: "20px" } } src="/logo_sb.png" width={70} height={70}/>
         <nav>
         <ul>
           <li>
            <Image style={ { cursor: "pointer" } } onClick={  ()=>{ handleRedirect( `/user/${id}`  ) }  } alt="user" width={20} height={20} src="/user_icon.png"/>
            <a>
              Perfil  
            </a>
           </li>
          </ul>
          <ul>
           <li>
           <Image alt="book" width={20} height={20} src="/book_icon.png"/>
            <a>
              Explorar
            </a>
           </li>
          </ul>
          <ul>
           <li>
           <Image alt="exit" width={20} height={20} src="/exit_icon.png"/>
            <a>
              Salir  
            </a>
           </li>
          </ul>
         </nav>
         <nav className="nav_responsive">
          <ul>
          <li style={ { cursor: "pointer" } }>
            <Image onClick={  ()=>{ handleRedirect( `/user/${id}`  ) }  } alt="user" width={25} height={25} src="/user_icon.png"/>
           </li>
           <li>
           <Image alt="book" width={25} height={25} src="/book_icon.png"/>
           </li>
           <li>
           <Image alt="exit" width={25} height={25} src="/exit_icon.png"/>
           </li>
          </ul>
         </nav>
        </header>
    )
}