import  { useEffect } from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineShoppingCartCheckout } from "react-icons/md";


const cart = () => {
    const {cart,decraseQty,addToCart,removeProduct,clearCart} = useContext(AppContext)
    const [price,setPrice] = useState(0)
    const [qty,setQty] = useState(0)

    useEffect(()=>{
      let qty= 0
      let price= 0
      for(let i =0; i<cart?.items?.length; i++ ){
        qty+= cart.items[i].qty
        price+= cart.items[i].price
      }
      
    setQty(qty);
    setPrice(price)
    },[cart])


  return (
<div className="bg-white min-h-screen p-4">
  {/* Check if the cart is empty */}
  {cart?.items?.length === 0 ? (
    <>
      <Link to="/">
        <h1 className="text-white text-center mt-48 font-semibold rounded-md bg-blue-500 w-4/5 md:w-1/3 lg:w-1/4 mx-auto p-2 hover:bg-blue-700">
        <MdOutlineShoppingCartCheckout className='text-yellow-400 text-3xl mx-auto'/> Continue...
        </h1>
      </Link>
    </>
  ) : (
    <>
      {/* Cart summary at the top */}
      <div className="flex justify-center gap-6 text-black font-bold   bg-white p-4 shadow-md">
        <span className="bg-green-100 px-3 py-1 rounded-md">
          Total Quantity: {qty}
        </span>
        <span className="bg-red-100 px-3 py-1 rounded-md">
          Total Price: Rs. {price}
        </span>
      </div>
    </>
  )}

  {/* Map through cart items */}
  {cart?.items?.map((data) => {
    return (
      <div
        className="flex flex-col md:flex-row items-center justify-between shadow-md p-4 mt-6 rounded-md w-[90%] lg:w-4/5 mx-auto bg-gray-50"
        key={data.productId}
      >
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={data.imgSrc}
            className="h-20 w-20 md:h-14 md:w-14 rounded-md"
            alt="Product"
          />
        </div>

        {/* Product details */}
        <div className="flex flex-col md:flex-row justify-between w-full mt-4 md:mt-0 md:ml-6">
          <div className="flex flex-col font-bold text-black">
            <span>Title:  <span className='md:hidden ml-4 text-[12px] '>{data.title}</span></span>
            <span>Price:  <span className='md:hidden ml-4 text-[12px] '>Rs. {data.price}</span></span>
            <span>Quantity:  <span className='md:hidden ml-4 text-[22px] text-red-900 font-bold '>{data.qty}</span></span>
          </div>
          <div className="flex flex-col text-red-900 font-serif text-sm ml-2 md:ml-6 text-start">
            <span className='hidden md:block'>{data.title}</span>
            <span className='hidden md:block'><span className='text-black'>Rs.</span> {data.price}</span>
            <span className='hidden md:block text-[22px] text-red-900 font-bold'>{data.qty}</span>
          </div>
        </div>

        {/* Actions for quantity and removal */}
        <div className="flex justify-between items-center gap-4 mt-4 md:mt-0">
          <button
            className="bg-yellow-500 px-2 py-1 rounded-md font-semibold hover:bg-yellow-700 text-xs"
            onClick={() => decraseQty(data.productId, 1)}
          >
            QTY-
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded-md font-semibold hover:bg-green-700 text-xs"
            onClick={() =>
              addToCart(
                data.productId,
                data.title,
                data.price / data.qty,
                1,
                data.imgSrc
              )
            }
          >
            QTY+
          </button>
          <button
            className="bg-red-600 px-2 py-1 rounded-md font-semibold hover:bg-red-800 text-xs"
            onClick={() => removeProduct(data.productId)}
          >
            Remove
          </button>
        </div>
      </div>
    );
  })}

  {cart?.items?.length > 0 && (
    <>
      <div className="flex justify-center gap-4 mt-6">
        <Link to="/adress">
          <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
            Check Out
          </button>
        </Link>
        <button
          className="bg-red-600 text-white font-bold px-4 py-2 rounded-md hover:bg-red-800 text-sm"
          onClick={() => clearCart()}
        >
          Clear Cart
        </button>
      </div>
    </>
  )}
</div>
  )
}

export default cart
