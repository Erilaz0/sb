"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Stars( { number } : { number : number } ){
    const stars = Array.from({ length: number }, (_, i) => i)

    return(
        <div className="rate">
            { 
            stars.map( ( item : number )=>
            <img key={item} alt="star" src="/star.png"/>
            )
             }
        </div>
    )
}