import { Schema , model } from "mongoose";

const otpSchema = new Schema({
    code: {
        type: String, 
        required: true,
        length: 6
    },
    email: { 
        type: String, 
        required: true, 
        lowercase: true,
        trim: true
    },
    expiredAt : {
        type: Date, 
        required: true,
        index: { expires: 0}
        }
    },
       {
         timestamps:{
        createdAt: true,
        updatedAt: true
    } ,   
 }
)


export const OTP = model('OTP', otpSchema)