import mongoose, { mongo } from "mongoose";

const WageSchema=new mongoose.Schema({
    industry:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    zone:{
        type:String,
        required:true   
    },
    perDay:{
        type:Number,
        required:true
    }
})

const minWage=mongoose.model('minWage',WageSchema)
export default minWage;