import { User } from "../Models/userModel.js";
import bcrypt from 'bcryptjs'
import { json } from "express";
import jwt from 'jsonwebtoken'

// user register
export const register = async (req, res) => {

    const { name, email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(402).json({ message: "this user allready exist", success: false })

        //   password hash  
        const hashpass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashpass });
        res.json({ massege: "user registration successfull...!", success: true, user })
    } catch (err) {
        console.log('user model create err', err)
    }

}

// user login
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) return res.json({ message: "this user doeas not exist", success: false });

        const validpassword = await bcrypt.compare(password, user.password);
        if (!validpassword)
            return res.json({ message: "invalid credential", success: false })

        const token = jwt.sign({ userId: user._id }, '12121', { expiresIn: '220d' })
        res.json({ message: `welcome Mr.${user.name} `, token, success: true })

    } catch (er) {
        console.log(er)
    }
}


// get all user 
export const users = async (req, res) => {
    try {
        let user = await User.find().sort({ createdAt: -1 })
        console.log(user)
        res.json(user)
    } catch (er) {
        res.json(er)
    }
}

export const profile = async (req, res) => {
    res.json({ user: req.user })
}
