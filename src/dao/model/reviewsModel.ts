import mongoose from "mongoose"

const reviewsCollection = "reviews";
const reviewsSchema = new mongoose.Schema({
 username : { type : String , required : true },
 password : { type : String , required : true },
 nickname : { type : String , required : true , unique : true },
 email : { type : String , required : true , unique : true },
 profile_picture : { type : String , default : "none" },
 followers : [ { fid: { type : String , default : "none" } } ],
 followed : [ { fid: { type : String , default : "none" } } ],
 created_at : { type : String },
 description: { type : String },
 large_photo: { type : String , default : "none" },
 reviews : [{ 
    genre: { type : String , required : true },
    score: { type : Number , required : true },
    thumbnail: { type : String },
    favourite_character : { type : String },
    physical_or_digital : { type : String , required : true },
    public_or_private : { type : Boolean , required : true },
    shinys : { type : Number , required : true },
    description : { type : String , required : true },
    date : { type : Date , required : true },
    title : { type : String , required : true },
    number_pages : { type : Number , required : false },
    emotion : { type : String },
    comments : [
        {
            user : { type : String },
            photo : { type : String },
            comment : { type : String },
            answers : [{
                answer : {
                    user : { type : String },
                    photo : { type : String },
                    comment : { type : String },
                }
            }]
        }
    ]
}],
 
 
})

const reviewsModel = mongoose.models[reviewsCollection] || mongoose.model(reviewsCollection, reviewsSchema)
export default reviewsModel