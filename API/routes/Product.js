import express from "express";
import {addProduct,getProducts,getProductBYId, UpdateProductBYId,deletProductBYId} from '../controllers/ProductController.js'

const router = express.Router();


// add produtc
router.post('/add',addProduct);

// get prducts
router.get('/all',getProducts);

// get prodyct By Id 
router.get('/:id',getProductBYId);

// update product by id
router.put('/:id', UpdateProductBYId)

// deleteproduct by id
router.delete('/:id', deletProductBYId)

export default router;