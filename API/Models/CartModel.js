import mongoose from "mongoose";

 const cartItemSchem = new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        require:true
    },
    title:{type:String,require:true},
    price:{type:Number,require:true},
    qty:{type:Number,require:true},
    imgSrc:{type:String,require:true},

})

 const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },

    items:[cartItemSchem],
 })


 export const  Cart = mongoose.model("Cart",cartSchema)