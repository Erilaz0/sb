export interface Review {
    _id?: string
    genre: string
    score: number
    favourite_character: string
    physical_or_digital: "Fisico" | "Digital" // puedes ajustar si hay más opciones
    public_or_private: boolean
    shinys?: number
    description: string
    date?: string // o `Date` si lo parseas
    title: string
    number_pages: number
    emotion: string
    thumbnail: string
    comments?: any[] // puedes tipar esto mejor si sabes cómo es un comentario
  }

export interface Follower{
 nickname : string,
 profile_picture : string,
 _id: string
}

export interface UserInt {
    _id?: string
    username: string
    password: string
    nickname: string
    email: string
    description?: string
    large_photo?: string
    profile_picture?: string
    followers?: string[] // si en un futuro contiene los IDs de otros usuarios
    reviews?: Review[]
    __v?: number
    created_at?: string
  }