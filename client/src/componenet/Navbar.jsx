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
import { SlEarphones } from "react-icons/sl";
import { LiaMobileSolid } from "react-icons/lia";
import { IoMdWatch } from "react-icons/io";
import { IoIosLaptop } from "react-icons/io";

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

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <>

      <div  className=' hidden flex flex-row   md:block justify-between p-3 bg-gradient-to-r pt-6  from-blue-700 to-blue-400 z-10 shadow-2xl sticky top-0 left-0 right-0'>
        <div className='flex' >
          <Link to={'/'}><img className='h-7 animate-bounce  rounded-md ' src='https://cdn.pixabay.com/photo/2015/04/18/07/49/shopping-cart-728430_960_720.png' /></Link>

          <form className=' w-[45%] flex ml-[10%]'>
            <input className='w-full rounded-md outline-none bg-blue-400  text-black px-2' value={search} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='' />
            <button onClick={submitHandle}> <IoSearchSharp className="relative right-6  text-xl text-white" /></button>
          </form>

        </div>

        {/* btns */}
        <div className=' w-[36%]  items-center  flex absolute left-[60%] bottom-1 flex-row justify-between font-semibold '>
          {
            isAuthent ? <div className='flex items-center justify-between  w-full'>
              <div className='mt-3 flex justify-center items-center  ' >
                <button><span className='text-[10px]  rounded-full  border bg-red-500 px-1 text-[8px]  font-bold '>{cart?.items?.length}</span><Link to={'/cart'}><GiShoppingCart className='text-2xl text-black relative -top-2' /></Link></button></div>


              <Link to={'/profile'} className='mt-6'> <FaUserGear className='text-2xl hover:text-black' /> </Link>
              <button className='bg-red-800 mt-6 hover:bg-red-900 px-2 py-1 rounded-md text-white flex justify-center items-center gap-1 text-sm' onClick={() => {
                logOutUser()
                navigate('/')
              }}>Logout <MdOutlineLogout /></button>

            </div> : <>
              <div className=' mx-auto  w-[34%]  flex justify-between  items-center mr-[10%]'>

                <div className='flex  w-[200px] justify-between'>
                  <Link to={'/login'}> <button className='px-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-full hover:text-black group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500  dark:text-white text-white focus:ring-4 focus:outline-non'>LOGIN</button></Link>
                  <Link to={'register'}><button className="px-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-full hover:text-black group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500  dark:text-white text-white focus:ring-4 focus:outline-non">REGISTER</button></Link>
                </div>
              </div>
            </>
          }
        </div>

      </div>
      {/* sub bar right  */}
      <div className='   bg-blue-400  flex justify-between  md:hidden'>

        <div className=' flex justify-evenly   items-center'>

          <div className=' p-2'>
            <Link to={'/'}>
              <img className='h-auto  animate-pulse   w-[230px]  ' src='https://cdn.pixabay.com/photo/2015/04/18/07/49/shopping-cart-728430_960_720.png' /></Link>
          </div>
          <form className=' w-[350%] ml-4 font-thin  text-[8px] flex'>
            <input className='w-full rounded-sm bg-blue-500  outline-none px-4 text-black p-1 mt-1' value={search} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='...' />
            <button onClick={submitHandle}> <IoSearchSharp className="relative right-6 mt-1  text-sm md:text-xl text-white" /></button>
          </form>

        </div>

        {
          isAuthent ? (
            <div className="flex justify-between    w-[120px]  items-center p-1">
              {/* Cart Icon */}
              <div >
                <button className=' flex  flex-col items-center'>
                  <span className=" border bg-red-500 px-1 text-[8px] m-[2px]   rounded-full mt-3  font-bold">
                    {cart?.items?.length}
                  </span>
                  <Link to={"/cart"}>
                    <GiShoppingCart className="text-2xl text-black   relative -top-2" />
                  </Link>
                </button>
              </div>

              <div className="relative">
                {/* Dropdown Trigger */}
                <button
                  className=" text-white px-2  m-2 rounded-md text-sm md:text-base"
                  onClick={() => toggleDropdown((prev) => !prev)}
                >
                  {isOpen ? <RiCloseLargeLine /> : <GiHamburgerMenu />}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute     bg-blue-400 -right-[4px] rounded-bl-md  mt-2 w-40  border-gray-200 shadow-lg z-20">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/profile"
                          className="block underline px-4 py-2 text-sm text-blue-800 font-semibold rounded-md m-8 hover:text-blue-600 "
                          onClick={() => toggleDropdown((prev) => !prev)}
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            logOutUser()
                           
                            navigate("/");
                            toggleDropdown((prev) => !prev)
                          }}
                          className="block w-full underline text-red-800 font-semibold text-left px-4 py-2 text-sm rounded-md m-8 hover:text-red-600"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className=" w-[34%] gap-x-2 mt-[2px] flex py-2 items-center justify-end ">
                <Link to={"/login"}>
                  <button className="px-2 hover:text-black relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[8px] font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500  dark:text-white focus:ring-4 focus:outline-none   ">
                    Login
                  </button>
                </Link>
                <Link to={"register"}>
                  <button className="px-2 hover:text-black relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-[8px] font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500  dark:text-white focus:ring-4 focus:outline-none  ">
                    Register
                  </button>
                </Link>
              </div>
            </>
          )
        }

      </div>

      {location.pathname === '/' && (
        <div data-aos="slide-left" data-aos-duration="1000"  className='bg-gradient-to-r from-pink-300 to-blue-400  text-white text-sm font-serif flex justify-around px-4 py-1 z-10    top-[53px] left-0 right-0'>
          <button onClick={() => noFilter(products)} className='rounded-md  text-[7px] md:text-[12px] px-2 bg-red-500 hover:text-black hover:bg-red-600   cursor-pointer'>All</button>
          <button onClick={() => filterByCategory("mobile")} className='flex text-[7px] md:text-[12px]  items-center gap-1 rounded-md rounded-md px-2 bg-red-500 hover:text-black hover:bg-red-600   cursor-pointer'>Mobile <LiaMobileSolid className='text-black' /></button>
          <button onClick={() => filterByCategory('earbuds')} className='flex text-[7px] md:text-[12px]  items-center gap-1 rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Earbuds <SlEarphones className='text-black' /></button>
          <button onClick={() => filterByCategory('watch')} className='flex text-[7px] md:text-[12px]  items-center gap-1 rounded-md  rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Watch <IoMdWatch className='text-black' /></button>
          <button onClick={() => filterByCategory('laptop')} className=' flex text-[7px] md:text-[12px]  items-center gap-1 rounded-md px-2 bg-red-500 hover:text-black  hover:bg-red-600 cursor-pointer'>Laptop <IoIosLaptop className='text-black' /></button>
        </div>)}
    </>
  )
}

export default Navbar
