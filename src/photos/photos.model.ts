import mongoose from "mongoose";

export const photosSchema = new mongoose.Schema({
    photo:{
        type:String,
        required:true
    }
})

export interface Photo extends mongoose.Document {
    photo:string
}