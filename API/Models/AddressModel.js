import mongoose from "mongoose";
export const adresstSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },

    fullName: {type:String,require:true},
    adress: {type:String,require:true},
    city: {type:String,require:true},
    state: {type:String,require:true},
 country: {type:String,require:true},
    pincode: {type:Number,require:true},
    phoneNumber: {type:Number,require:true},
    createdAt: {type:Date,default:Date.now},
});

export const Address = mongoose.model('Adress', adresstSchema);