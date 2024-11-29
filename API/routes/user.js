import express from 'express';
import { register,login,users ,profile} from '../controllers/UserControler.js';
import { Authenticated } from '../Middlewares/isAuthenticated.js';

const router = express.Router()

// register user
router.post('/register',register);

// login user 
router.post('/login',login);

// get all user 
router.get('/all',users);

// get profile 
router.get('/profile',Authenticated ,profile)

export default router;