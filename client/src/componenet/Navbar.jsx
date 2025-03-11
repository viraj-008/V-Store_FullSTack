import AppContext from '../context/AppContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { FaUserGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { FcShop } from "react-icons/fc";

function Navbar() {

  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearchTerm] = useState('')

  const { products, setFilteredProducts, logOutUser, isAuthent, cart } = useContext(AppContext)

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


  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Desktop Navbar */}
    <div className="hidden md:flex justify-between items-center p-3 bg-gradient-to-r from-blue-700 to-blue-400 shadow-2xl sticky top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-1">
        <Link to="/" className='flex items-center gap-1 text-blue-200 shadow-md px-2 rounded-md '>
        <FcShop className='text-3xl'  />
      𝓥-𝓼𝓽𝓸𝓻𝓮
        </Link>
      </div>

      <form className="flex w-1/2">
        <input
          className="w-full rounded-md outline-none bg-blue-800 text-black px-3 py-1"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search products..."
        />
        <button type="submit" onClick={submitHandle} className="-ml-10">
          <IoSearchSharp className="text-xl text-white" />
        </button>
      </form>

      <div className="flex items-center gap-6">
        {isAuthent ? (
          <>
            <Link to="/cart" className="relative">
              <GiShoppingCart className="text-2xl text-black" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cart?.items?.length || 0}
              </span>
            </Link>
            <Link to="/profile">
              <FaUserGear className="text-2xl hover:text-black" />
            </Link>
            <button
              className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded-md text-white flex items-center gap-1"
              onClick={() => {
                logOutUser();
                navigate("/");
              }}
            >
              Logout <MdOutlineLogout />
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full">
                LOGIN
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full">
                REGISTER
              </button>
            </Link>
          </>
        )}
      </div>
    </div>

    {/* Mobile Navbar */}
    <div className="md:hidden flex justify-between items-center p-3 bg-blue-400 shadow-lg sticky top-0 left-0 right-0 z-10">
      <Link to="/" className='flex items-center gap-1 text-blue-900 shadow-md px-2 rounded-md '>
      <FcShop className='text-3xl' onClick={() => setIsOpen(false)}/> 𝓥-𝓼𝓽𝓸𝓻𝓮
      </Link>
      
      <button onClick={() => setIsOpen(!isOpen)} className="text-black text-2xl">
        {isOpen ? <RiCloseLargeLine  className="text-[16px] text-center  mr-1" /> : <GiHamburgerMenu />}
      </button>

      {isOpen && (
        <div className="absolute top-[51px] right-0 w-40 bg-blue-400 rounded-b-md shadow-md p-2">
          {isAuthent ? (
            <>
              <Link to="/cart" className="block font-semibold py-2 text-blue-800" onClick={() => setIsOpen(!isOpen)}>Cart <span className='text-black'>({cart?.items?.length || 0})</span></Link>
              <Link to="/profile" className="block font-semibold py text-blue-800" onClick={() => setIsOpen(!isOpen)}>Profile</Link>
              <button
                className="w-full text-left text-red-600 font-semibold py-2 hover:text-red-700"
                onClick={() => {
                  logOutUser();
                  navigate("/");
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-white hover:text-black">Login</Link>
              <Link to="/register" className="block py-2 text-white hover:text-black">Register</Link>
            </>
          )}
        </div>
      )}
    </div>

    {/* Category Filter Bar */}
    {location.pathname === "/" && (
      <div className="bg-gray-800 text-white text-[8px] md:text-[14px] flex justify-around px-4 py-2">
        <button onClick={() => noFilter(products)} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md">All</button>
        <button onClick={() => filterByCategory("mobile")} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md">Mobile</button>
        <button onClick={() => filterByCategory("earbuds")} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md">Earbuds</button>
        <button onClick={() => filterByCategory("watch")} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md">Watch</button>
        <button onClick={() => filterByCategory("laptop")} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md">Laptop</button>
      </div>
    )}
  </>
  )
}

export default Navbar
