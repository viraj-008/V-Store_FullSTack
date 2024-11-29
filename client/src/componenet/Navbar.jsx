import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { FaUserGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { SlEarphones } from "react-icons/sl";
import { LiaMobileSolid } from "react-icons/lia";
import { IoMdWatch } from "react-icons/io";
import { IoIosLaptop } from "react-icons/io";

function Navbar() {

  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearchTerm] = useState('')

  const { products, setFilteredProducts, logOutUser, isAuthent , cart} = useContext(AppContext)

  const noFilter = () => {
    setFilteredProducts(products)
  }

  const filterByCategory = (cat) => {
    setFilteredProducts(products.filter((data) => {
      console.log(data.category)
      return data.category.toLowerCase() == cat.toLowerCase()
    }))
  }


  const submitHandle = (e) => {
    e.preventDefault()
    navigate(`/product/search/${search}`)
    setSearchTerm('')
  }

  return (
    <>
      <div className='flex justify-between p-3 bg-gradient-to-r pt-6  from-blue-700 to-blue-400 z-10 shadow-2xl sticky top-0 left-0 right-0'>

        <div >
          <Link to={'/'}><h1 className=' rounded-sm font-serif font-semibold flex items-center '>shop </h1></Link>
        </div>

        <form className=' w-[45%] flex'>
          <input className='w-full rounded-md outline-none text-black px-2' value={search} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search products' />
          <button onClick={submitHandle}> <IoSearchSharp className="relative right-6  text-xl text-black" /></button>
        </form>

        {/* btns */}
        <div className=' w-[36%] flex justify-between font-semibold items-center'>
        {
          isAuthent ? <>
          <div ><button><span className='text-[10px]  rounded-full  underline font-bold '>{cart?.items?.length}</span><Link to={'/cart'}><GiShoppingCart className='text-2xl hover:text-black relative -top-2' /></Link></button></div>
          <Link to={'/profile'}> <FaUserGear className='text-2xl hover:text-black' /> </Link>
          <button className='bg-red-800 hover:bg-red-900 px-2 py-1 rounded-md text-white flex justify-center items-center gap-1 text-sm' onClick={() => {
            logOutUser()
            navigate('/')
          }}>Logout <MdOutlineLogout /></button>

          </> : <>
            <div className=' mx-auto w-[34%] flex justify-between'>
          <Link to={'/login'}> <button className='  bg-blue-700  px-2 p-1 rounded-xl  text-white  text-sm'>login</button></Link>
          <Link to={'register'}><button className='bg-blue-900  px-2 rounded-xl text-white p-1 text-sm'>Register</button></Link>
             </div>
          </>
        }
        </div>

      </div>
      {/* sub bar right  */}

      {location.pathname === '/' && (
        <div className='bg-gradient-to-r from-pink-300 to-blue-400  text-white text-sm font-serif flex justify-around px-4 py-1 z-10  fixed sticky top-[80px] left-0 right-0'>
          <span className='text-black font-semibold'>Categorys :</span>
          <button onClick={() => noFilter(products)} className='rounded-md px-2 bg-red-500 hover:text-black hover:bg-red-600   cursor-pointer'>All</button>
          <button onClick={() => filterByCategory("mobile")} className='flex items-center gap-1 rounded-md rounded-md px-2 bg-red-500 hover:text-black hover:bg-red-600   cursor-pointer'>Mobile <LiaMobileSolid className='text-black' /></button>
          <button onClick={() => filterByCategory('earbuds')} className='flex items-center gap-1 rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Earbuds <SlEarphones className='text-black' /></button>
          <button onClick={() => filterByCategory('watch')} className='flex items-center gap-1 rounded-md  rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Watch <IoMdWatch className='text-black' /></button>
          <button onClick={() => filterByCategory('laptop')} className=' flex items-center gap-1 rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Laptop <IoIosLaptop className='text-black' /></button>
        </div>)}
    </>
  )
}

export default Navbar
