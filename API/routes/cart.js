import express from 'express'
import {AddToCart,userCart,removeProductFromCart, clearCart,dereaseProductQty} from '../controllers/CartContoller.js'
import { Authenticated } from '../Middlewares/isAuthenticated.js';
const router = express.Router();

// add o cart
router.post('/add',Authenticated,AddToCart)

// get user cart
router.get('/user', Authenticated,userCart)

// remove product from Cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart);

// clear cart data 
router.delete('/clear',Authenticated,clearCart)

// item qty dcresed 
router.post('/--qty',Authenticated,dereaseProductQty)

export default router;