
  import React, { useEffect } from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
// import { Link } from 'react-router-dom'

const  checkOut = () => {
    const {cart,decraseQty,addToCart,removeProduct,clearCart,  userAdress} = useContext(AppContext)
    console.log(userAdress)
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
    <>


<div className=''>
<h1 className='text-black text-center font-extrabold'>Order Summary</h1>

{
  
   cart?.items?.map((data)=>{
    return(
      
      
      <div className='flex  px-2 border justify-between mx-auto bg-gray-400 w-[50%] '>

<div className='flex items-center  '><img src={data.imgSrc} className='h-14 w-14  rounded-md'/></div>

<div className='flex   w-[350px] text-center   '>
<div className='flex flex-col font-bold  text-black '>
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
  <span className='bg-yellow-500 px-2 hover:bg-yellow-700 rounded-md font-semibold cursor-pointer' onClick={()=>decraseQty(data.productId,1)}><CiCircleMinus className='h-6' /></span>
  <span className='bg-green-500 px-2 rounded-md font-semibold cursor-pointer hover:bg-green-700'  onClick={() => addToCart(data.productId, data.title, data.price/data.qty, 1, data.imgSrc)} ><CiCirclePlus className='h-6 font-bold'/></span>
  <span className='bg-red-600 px-2 rounded-md font-semibold cursor-pointer' onClick={()=>removeProduct(data.productId)} ><MdDelete className='h-6' /></span>
</div>

  </div>)
  })
  }

  <div className='w-[40%] mx-auto text-black '>
  <div className='w-[50%] mx-auto flex justify-between mt-2'>
  <h1 className='text-red-700 font-bold'>Total:</h1>
    <h1 className='font-semibold bg-blue-500 px-2 rounded-md'>Quantity :{qty}</h1>
    <h1 className='font-semibold bg-blue-500 px-2 rounded-md'>Price :{price}</h1>
  </div>
  <h1 className='text-center font-bold underline'>SHIPING ADRESS</h1>
  <div className='flex justify-between '><p className='font-bold'>Name :</p> <span>{userAdress?.fullName}</span></div>
  <div className='flex justify-between '><p className='font-bold'>Adress :</p> <span>{userAdress?.adress}</span></div>
  <div className='flex justify-between '><p className='font-bold'>City :</p> <span>{userAdress?.city}</span></div>
<div className='flex justify-between '><p className='font-bold'>State </p> <span>{userAdress?.state}</span></div>
  <div className='flex justify-between '><p className='font-bold'>Country :</p> <span>{userAdress?.country}</span></div>
  <div className='flex justify-between '><p className='font-bold'>Pincode :</p> <span>{userAdress?.pincode}</span></div>
  <div className='flex justify-between '><p className='font-bold'>Phone Number : </p> <span>{userAdress?.phoneNumber}</span></div>

    
  </div>

  </div>


  <div className=' text-center font-bold  '><button className='bg-yellow-500 px-3 mt-2 rounded-md'>Proced to Pay</button></div>
  
    
        
      
      </>
  )
}

export default checkOut
