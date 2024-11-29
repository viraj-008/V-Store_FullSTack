import React, { useEffect } from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
<div className='bg-white   '>

{
  cart?.items?.length === 0 ? <>
   <Link to='/'> <h1 className='text-black text-center font-semibold border absolute left-[40%] top-[50%] bg-yellow-500 px-2 rounded-md p-1 '>Click continue shoping...</h1></Link>
  </> :<>
      <div className='flex justify-center gap-10  text-black z-10 sticky top-[80px] font-bold  p-2 left-0 right-0 ' >
        <span className='bg-white px-2 rounded-md'>Total Qauntity : {qty}</span>
        <span className='bg-white px-2 rounded-md'>Total Price : {price}</span>
      </div>
      

  </>
}
  { cart?.items?.map((data)=>{
    return(
      <div className='flex  mx-auto justify-between shadow-md p-2 mt-6 rounded-md w-[80%]'>

<div className='flex '><img src={data.imgSrc} className='h-14 w-14 mt-2 rounded-md'/></div>

<div className='flex   w-[350px] text-center   '>
<div className='flex flex-col font-bold  text-black'>
<span>Title :</span>
  <span>Price :</span>
  <span>Quantity:</span>
</div>
<div className='flex flex-col text-red-900 font-serif ml-3 text-start  mx-auto  w-[90%]'>
  <span>{data.title}</span>
  <span>{data.price}</span>
  <span>{data.qty}</span>
  </div>


</div>
<div className=' w-[40%] flex justify-between items-center '>
  <span className='bg-yellow-500 px-2 hover:bg-yellow-700 rounded-md font-semibold cursor-pointer' onClick={()=>decraseQty(data.productId,1)}>QTY-</span>
  <span className='bg-green-500 px-2 rounded-md font-semibold cursor-pointer hover:bg-green-700'  onClick={() => addToCart(data.productId, data.title, data.price/data.qty, 1, data.imgSrc)} >QTY+</span>
  <span className='bg-red-600 px-2 rounded-md font-semibold cursor-pointer' onClick={()=>removeProduct(data.productId)} >Remove</span>
</div>

  </div>)
  })}

  {cart?.items?.length >0 &&<> <div className=' w-[30%] mx-auto flex justify-between mt-4'>
   <Link to='/adress'> <button className='bg-blue-600 px-2 rounded-md'>Check Out</button></Link>
    <button className='bg-red-600 px-2 rounded-md' onClick={()=>clearCart()}>Clear Cart</button>
  </div>
    </>
  }
 
</div>
  )
}

export default cart
