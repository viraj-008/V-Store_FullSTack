import React,{useEffect} from 'react'
import ShowProducts from './componenet/products/ShowProducts'
import ProductDetail from './componenet/products/ProductDetail'
import Navbar from './componenet/Navbar'
import SearchProduct from './componenet/products/searchProduct'
import Register from '../src/componenet/user/Register'
import Login from './componenet/user/Login'
import Profile from './componenet/user/Profile'
import Cart from './componenet/cart/Cart'
import CheckOut from './componenet/CheckOut/CheckOUt'
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import Address from './componenet/Address'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);


  return (

    <div>
    <Router>
    <ToastContainer />
    <Navbar/>
      <Routes>
      
        <Route path='/product/search/:term' element={<SearchProduct/>} />
        <Route path='/' element={<ShowProducts />} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/adress' element={<Address />} />
        <Route path='/checkout' element={<CheckOut />} />
  
      </Routes>
    </Router>
    </div>
  )
}

export default App
