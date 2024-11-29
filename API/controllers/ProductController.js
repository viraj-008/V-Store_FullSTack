import { Products } from "../Models/ProductModel.js";


// add product
export const addProduct = async(req,res)=>{
     
    try{
    const {title, discrition,price,category,qty,imgSrc,createdAt} = req.body
    let product = await Products.create({
        title, discrition,price,category
        ,qty,imgSrc,createdAt
    })

    res.json({message:"product added succesfull",product})
    }catch(er){
        res.json(er.message)
        console.log(er)
    }
}
 
// get product
export const getProducts = async(req,res)=>{    
    try{
      let products = await  Products.find().sort({createdAt:-1})
      res.json({message:"all products",products})

    }catch(er){
      console.log(er)
    }
         
}

// find product BY Id 
export const getProductBYId = async(req,res)=>{   
    const id = req.params.id;
    try{
      let product = await  Products.findById(id)
      if(!product) return res.json({message:"invalid id"})
      res.json({message:"speciific product",product})

    }catch(er){
      console.log(er)
    }
         
}
// update product BY Id 
export const UpdateProductBYId = async(req,res)=>{   
    const id = req.params.id;
    try{
      let product = await  Products.findByIdAndUpdate(id,req.body,{new:true})
      if(!product) return res.json({message:"invalid id"})
      res.json({message:"product has beem updated",product})

    }catch(er){
      console.log(er)
    }
         
}


// delet produc  id 
export const deletProductBYId = async(req,res)=>{     
    const id = req.params.id;
    try{
      let product = await  Products.findByIdAndDelete(id)
      if(!product) return res.json({message:"invalid id"})
      res.json({message:"product has beem deletd",product})

    }catch(er){
      console.log(er)
    }
         
}
