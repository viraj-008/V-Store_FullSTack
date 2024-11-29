import { payment } from "../Models/PaymentModel.js";
import Razorpay from 'razorpay'
 


        const razorpay = new Razorpay({
            key_id:"rzp_test_GpqgygXdaWjLmO", 
            key_secret:"jUS7YyxvqEFngWeY8UOWSyG7"
        });

        export const checkOut = async (req,res)=>{
            const {amount,cartItems,userShiping,userId} = req.body
            const options = {
                amount: amount * 100, // amount in smallest currency unit
                currency: "INR",
                receipt: `reciept_${Date.now()}`,
            };
            const order = await instance.orders.create(options);
            res.status(200).json(order);
        }
