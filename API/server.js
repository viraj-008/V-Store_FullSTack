import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'express'
import userrouter from './routes/user.js'
import productRoute from './routes/Product.js'
import cartRoute   from './routes/cart.js'
import  adressRouter  from "./routes/Adress.js";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config(); 

const app = express();

app.use(bodyParser.json());


app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// user route 
app.use('/api/user',userrouter)

// product route
app.use('/api/products',productRoute)

// add to cart
app.use('/api/cart',cartRoute)


// address data
app.use('/api/adress',adressRouter )

mongoose.connect(process.env.Mongo_URI,{DbName:'MERN-ECOM'}).then(()=>{
    console.log("mongoDB conected sucesfully")
}).catch((errdb)=>{
console.log("db error",errdb)
})

const PORT = 1000; 
 app.listen(PORT,()=>{
    console.log("server i s run",PORT)
 }
)

// virajshekhar008
// QVRpmCdmXtwtfxOL