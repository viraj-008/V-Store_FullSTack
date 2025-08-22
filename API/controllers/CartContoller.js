import {Cart} from '../Models/CartModel.js';


// add to cart 
export const AddToCart = async (req,res)=>{
   const { productId,title,price,qty,imgSrc} = req.body
   console.log(productId,title,price,qty,imgSrc)

   const userId = req.user
   let cart =await Cart.findOne({userId}) 
   if(!cart){
      cart = new Cart({userId,items:[]})
    }
    const itemIndex = cart.items.findIndex(item => item.productId?.toString() === productId);
    
if(itemIndex > -1){
cart.items[itemIndex ].qty +=qty
cart.items[itemIndex ].price +=price*qty
}else{
   cart.items.push({productId,title,price,qty,imgSrc})
}

   await cart.save()
   res.json({message:"items added to cart",cart})
}

// get user carrt

export const userCart = async (req,res)=>{
      const userId = req.user

      let cart = await Cart.findOne({userId})
      if(!cart) return res.json({message:"cart not found"})

      res.json({message:"user cart",cart})
}


// remove cart 
export const removeProductFromCart = async (req,res)=>{
   const productId=req.params.productId
   const userId = req.user

   let cart = await Cart.findOne({userId})
   if(!cart) return res.json({message:"cart not found"})
   cart.items=cart.items.filter((item)=>item.productId.toString() !== productId)
   await cart.save()

   res.json({message:"product remove from cart",cart})
} 


// clear cart 
export const clearCart = async (req,res)=>{
   const userId = req.user
   let cart = await Cart.findOne({userId})
   if(!cart) {
      cart = new Cart({item:[]})
   }else{
      cart.items = [];
   }
   await cart.save()

   res.json({message:"cart cleared",cart})
} 


// decrease  qty from cart
export const dereaseProductQty = async (req,res)=>{

   const { productId,qty} = req.body

   const userId =req.user
   let cart = await Cart.findOne({userId}) 

   if(!cart){
      cart = new Cart({userId,items:[]})
 }
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    console.log(itemIndex)

if(itemIndex > -1){
const item = cart.items[itemIndex]
if(item.qty > qty){
   const pricePerUnit = item.price/item.qty;
    item.qty -= qty
    item.price -= pricePerUnit*qty
}else{
   cart.items.splice(itemIndex,1)
}

}else{
return res.json({message:"invalid produc id"})
}

   await cart.save()

   res.json({message:"items qty decreased",cart})
}