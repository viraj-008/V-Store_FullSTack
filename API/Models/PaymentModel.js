import mongoose from 'mongoose'


const paymentSchema =({
    orderDate:{type:Date,default:Date.naow},
    paystatus:{type:String}
},{strict:false})

export const payment = mongoose.model('payment',paymentSchema);