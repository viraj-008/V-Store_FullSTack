import jwt from 'jsonwebtoken'
import {User} from '../Models/userModel.js'
export const Authenticated = async (req,res,next)=>{
 const token = req.header('Auth')
 if(!token) return res.json({message:"login first plz"})
  
    const decode = jwt.verify(token,'12121')
    const id = decode.userId
    let user = await User.findById(id)
    console.log(user)

    if(!user) return res.json({message:"user not exist"})
        req.user = user
    next()

}