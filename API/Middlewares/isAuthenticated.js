import jwt from 'jsonwebtoken'
import {User} from '../Models/userModel.js'
export const Authenticated = async (req,res,next)=>{
 const token = req.header('Auth')
 if(!token) return res.json({message:"Authentication required. Please log in."})
  
    const decode = jwt.verify(token,'12121')
    const id = decode.userId
    let user = await User.findById(id)
    console.log(user)

    if(!user) return res.json({message:"User account does not exist"})
        req.user = user
    next()

}