import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import RelatedProduts from './RelatedProduts';
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
    const {  addToCart,setBuyNowProduct} = useContext(AppContext);
    const [product, setProduct] = useState({})
    const { id } = useParams();
    const navigate=useNavigate()

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
        return <div>Error: Product not found</div>; // Handle error if prodmmt not found           
      }

    return (
        <div className=' bg-white mx-auto '>
        <div>
        <img src={product.imgSrc} className='w-[90%] md:w-[33%] border rounded-md  mx-auto mt-2'/></div>
        <div className='w-[90%] md:w-[50%] text-center  mx-auto text-2xl bg-gray-600 rounded-lg mt-4 p-2   leading-10  justify-between'>
            <h1 className='bg-yellow-400 rounded-md '><span className='text-black font-bold'>TITLE:</span> {product.title}</h1>
            <h1 className='bg-green-700 my-2 rounded-md '><span className='text-black font-bold'>PRICE:</span> {product.price} rs</h1>
            <h1 className=' text-sm rounded-md '><span className='text-black font-semi-bold'>CATEGORY</span> : <span className='text-red-400 font-serif'>{product.category}</span></h1>
            <h1 className=' text-sm rounded-md '>DISCRIPTON : {product.discrition}</h1>
        </div>
        <div className='flex justify-between w-[80%] md:w-[25%] mx-auto  py-[2%]'>
        <button className='bg-yellow-400 font-semibold  px-2 text-black py-1 rounded-md'  onClick={() =>
                  addToCart(
                    product._id,
                    product.title,
                    product .price,
                    1,
                    product.imgSrc
                  )
                }>ADD TO CART</button>
        <button className='bg-red-600 font-semibold font-serif px-2 py-1 rounded-md'
         onClick={() => {
          setBuyNowProduct({
            title: product.title,
            price: product.price,
            imgSrc: product.imgSrc,
            qty: 1, // Default quantity
          });
          navigate('/adress'); // Go to checkout page
        }}>BUY NOW

                    </button>
        </div>

<RelatedProduts category={product.category}/>
        </div>
    )
}

export default ProductDetail
