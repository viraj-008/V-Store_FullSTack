import express from 'express'
import {address ,getAdress} from '../controllers/AddessController.js'
import { Authenticated } from '../Middlewares/isAuthenticated.js';
const router = express.Router();

// add adress 
router.post('/add',Authenticated,address )


// get adress 
router.get('/get',Authenticated,getAdress )

export default router; 