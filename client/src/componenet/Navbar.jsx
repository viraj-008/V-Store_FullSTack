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
  <div className="hidden md:flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 left-0 right-0 z-50">
    <div className="flex items-center">
      <Link to="/" className='flex items-center gap-2 text-white px-3 py-1 rounded-lg transition-all duration-300 hover:bg-blue-500'>
        <FcShop className='text-3xl bg-white rounded-full p-1'  />
        <span className="font-bold text-xl tracking-wide">𝓥-𝓼𝓽𝓸𝓻𝓮</span>
      </Link>
    </div>

    {location.pathname === "/" && (
      <form className="flex w-1/2 relative" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full rounded-full outline-none bg-white text-gray-800 px-5 py-2 pr-10 shadow-inner focus:ring-2 focus:ring-cyan-400 transition-all"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search products..."
        />
        <button 
          type="submit" 
          onClick={submitHandle} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoSearchSharp className="text-xl text-blue-700" />
        </button>
      </form>
    )}

    <div className="flex items-center gap-6">
      {isAuthent ? (
        <>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-blue-500 transition-colors group">
            <GiShoppingCart className="text-2xl text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full shadow-md">
              {cart?.items?.length || 0}
            </span>
          </Link>
          <Link to="/profile" className="p-2 rounded-full hover:bg-blue-500 transition-colors group">
            <FaUserGear className="text-2xl text-white group-hover:scale-110 transition-transform" />
          </Link>
          <button
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-full text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
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
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all">
              LOGIN
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all">
              REGISTER
            </button>
          </Link>
        </>
      )}
    </div>
  </div>

  {/* Mobile Navbar */}
  <div className="md:hidden flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 left-0 right-0 z-50">
    <Link to="/" className='flex items-center gap-1 text-white px-2 py-1 rounded-lg'>
      <FcShop className='text-2xl bg-white rounded-full p-0.5' onClick={() => setIsOpen(false)}/> 
      <span className="font-bold text-lg">𝓥-𝓼𝓽𝓸𝓻𝓮</span>
    </Link>

    {location.pathname === "/" && (
      <form className="flex w-[100px] relative" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full rounded-full outline-none bg-white text-black px-3 py-1 pr-7 text-sm shadow-inner"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <button 
          type="submit" 
          onClick={submitHandle} 
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <IoSearchSharp className="text-md text-blue-700" />
        </button>
      </form>
    )}
    
    <button 
      onClick={() => setIsOpen(!isOpen)} 
      className="text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
    >
      {isOpen ? <RiCloseLargeLine className="text-xl" /> : <GiHamburgerMenu className="text-xl" />}
    </button>

    {isOpen && (
      <div className="absolute top-full right-0 w-48 bg-gradient-to-b from-blue-700 to-blue-600 rounded-bl-lg shadow-xl p-3 border-t border-blue-400">
        {isAuthent ? (
          <>
            <Link 
              to="/cart" 
              className="flex items-center justify-between font-medium py-3 px-3 text-white hover:bg-blue-500 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-2">
                <GiShoppingCart className="text-xl" />
                <span>Cart</span>
              </div>
              <span className='bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                {cart?.items?.length || 0}
              </span>
            </Link>
            <Link 
              to="/profile" 
              className="flex items-center gap-2 font-medium py-3 px-3 text-white hover:bg-blue-500 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUserGear className="text-xl" />
              <span>Profile</span>
            </Link>
            <button
              className="w-full text-left flex items-center gap-2 text-white font-medium py-3 px-3 hover:bg-blue-500 rounded-lg transition-colors"
              onClick={() => {
                logOutUser();
                navigate("/");
                setIsOpen(false);
              }}
            >
              <MdOutlineLogout className="text-xl" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              onClick={() => setIsOpen(!isOpen)} 
              className="block py-3 px-3 text-white font-medium hover:bg-blue-500 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              onClick={() => setIsOpen(!isOpen)} 
              className="block py-3 px-3 text-white font-medium hover:bg-blue-500 rounded-lg transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    )}
  </div>

  {/* Category Filter Bar */}
  {location.pathname === "/" && (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white flex justify-center md:justify-around items-center flex-wrap gap-2 px-4 py-3 shadow-md">
      <button 
        onClick={() => noFilter(products)} 
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all"
      >
        All
      </button>
      <button 
        onClick={() => filterByCategory("mobile")} 
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all"
      >
        Mobile
      </button>
      <button 
        onClick={() => filterByCategory("earbuds")} 
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all"
      >
        Earbuds
      </button>
      <button 
        onClick={() => filterByCategory("watch")} 
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all"
      >
        Watch
      </button>
      <button 
        onClick={() => filterByCategory("laptop")} 
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 py-1.5 rounded-full text-xs md:text-sm shadow-md transition-all"
      >
        Laptop
      </button>
    </div>
  )}
</>
  )
}

export default Navbar
