import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import RelatedProduts from './RelatedProduts';

function ProductDetail() {
    const [product, setProduct] = useState({})
    const { id } = useParams();

    console.log('render bay searchbar')
    const url = "http://localhost:1000/api"
    useEffect(() => {
        
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/products/${id}`, {
                headers: {
                    "Content-Type": "Application/json"
                },
                withCredentials: true
            });

            setProduct(api.data.product)
        };

        fetchProduct();
    }, [id])

    if (product === null) {
        return <div>Loading product...</div>; // Display loading indicator
      }
    
      if (product === undefined) {
        return <div>Error: Product not found</div>; // Handle error if product not found
      }

    return (
        <div className=' bg-white mx-auto '>
        <div><img src={product.imgSrc} className='w-[33%] rounded-md h-[400px] mx-auto'/></div>
        <div className='w-[50%] text-center  mx-auto text-2xl bg-gray-600 rounded-lg mt-4 p-2   leading-10  justify-between'>
            <h1 className='bg-yellow-400 rounded-md '><span className='text-black font-bold'>TITLE:</span> {product.title}</h1>
            <h1 className='bg-green-700 my-2 rounded-md '><span className='text-black font-bold'>PRICE:</span> {product.price} rs</h1>
            <h1 className=' text-sm rounded-md '><span className='text-black font-semi-bold'>CATEGORY</span> : <span className='text-red-400 font-serif'>{product.category}</span></h1>
            <h1 className=' text-sm rounded-md '>DISCRIPTON : {product.discrition}</h1>
        </div>
        <div className='flex justify-between w-[25%] mx-auto py-[2%]'>
        <button className='bg-yellow-400 font-semibold  px-2 text-black py-1 rounded-md'>ADD TO CART</button>
        <button className='bg-red-600 font-semibold font-serif px-2 py-1 rounded-md'>BUY NOW</button>
        </div>

<RelatedProduts category={product.category}/>
        </div>
    )
}

export default ProductDetail
