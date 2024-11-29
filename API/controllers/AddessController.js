import {Address} from "../Models/AddressModel.js"

export const address = async (req,res)=>{
    let {fullName,adress,city,state,country,pincode,phoneNumber}=req.body;

    
    const userId = req.user
 
    let userAdress= await  Address.create({
        userId,
        fullName,
        adress,
        city,
        state,
        country,
        pincode,
        phoneNumber
    }) 

    res.json({message:"Address added",userAdress,success:true})
}

// get user adress 

export const getAdress = async (req,res)=>{
    let adress = await Address.find({userId:req.user}).sort({createdAt:-1})
    res.json({message:"adrsss geted",userAdrss:adress[0]})
}