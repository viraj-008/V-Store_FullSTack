import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AppContext from './AppContext.jsx'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AppState = (props) => {

  const [products, setProducts] = useState([])
  const [token, setToken] = useState('')
  const [isAuthent, setIsAuthent] = useState(false)
  const [filterProducts, setFilteredProducts] = useState([])
  const [user,setUSer] = useState("")
  const [cart,setCart] = useState([])
  const [userAdress,setUserAdress] = useState()
  const [reloed,setreloed] = useState(false)
  const [cartloed, setCartloed] = useState(false)
  
  const [buyNowProduct, setBuyNowProduct] = useState(() => {
    const storedProduct = localStorage.getItem('buyNowProduct');
    return storedProduct ? JSON.parse(storedProduct) : null;
  });
  
  useEffect(() => {
    if (buyNowProduct) {
      localStorage.setItem('buyNowProduct', JSON.stringify(buyNowProduct));
    } else {
      localStorage.removeItem('buyNowProduct');
    }
  }, [buyNowProduct]);
  

  const url = "http://localhost:1000/api"

  useEffect(() => {

    const fetchProduct = async () => {
      const api = await axios.get(`${url}/products/all`, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      });

      setProducts(api.data.products)
      setFilteredProducts(api.data.products)
      userProfile()
      getAddress()
      
    };
    
    userCart()
    fetchProduct();

  }, [token,reloed])




  // user registration 
  const RegisterUser = async (name, email, password) => {

    try {
      const api = await axios.post(`${url}/user/register`, { name, email, password }, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      });

      console.log("user registered", api)
      return api

    } catch (err) {
      console.log('ere catc', api)
    }
  }

  // login user
  const LoginUser = async (email, password) => {
    try {
      const api = await axios.post(`${url}/user/login`, { email, password }, {
        headers: {
          "Content-Type": "Application/json"
        },
        withCredentials: true
      });

      toast(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })

      setIsAuthent(true)
      const istoken = api.data.token
      setToken(istoken)
      return api.data

    } catch (err) {
      console.log('eatch', err)
    }
  }


  // set token 
  useEffect(() => {
    if (token) {
      localStorage.setItem('Token', token);
      setIsAuthent(true);
    }
  }, [token]);


// getTken 
useEffect(()=>{
 setToken(localStorage.getItem("Token"))
},[])

  // logout user 
  const logOutUser = async()=>{
    setIsAuthent(false)
    setToken('')
    localStorage.removeItem('Token')
    toast('Logout succesfull', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })

  }

  // user profile  
    const userProfile = async () => {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      });
   setUSer(api.data.user)

    };

 


  

  // add to cart 

    const addToCart = async (productId,title,price,qty,imgSrc) => {
      const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgSrc}, {
        headers: {
          "Content-Type": "Application/json", 
           "Auth":token
        },
        withCredentials: true
      });
    toast(api.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    })

    setreloed(!reloed)
    };

    //  get users cart item 
    const userCart = async () => {
      setCartloed(false)
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      });

      setCartloed(true)
      setCart(api.data.cart)
    };

    
    // decrese product id 
    const decraseQty = async (productId,qty) => {
      const api = await axios.post(`${url}/cart/--qty`,{productId,qty}, {
        headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      });
      setreloed(!reloed)
     console.log(api)
      
    };


    // remove product by id 
    const removeProduct = async (productId) => {
      const api = await axios.delete(`${url}/cart/remove/${productId}`,{
        headers: {
          "Content-Type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      });
      toast(api.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      setreloed(!reloed)
console.log('remoce item from cart',api)
    }


// clear cart 
const clearCart = async (productId) => {
  const api = await axios.delete(`${url}/cart/clear/`,{
    headers: {
      "Content-Type": "Application/json",
      "Auth":token
    },
    withCredentials: true
  });
  toast(api.data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
  setreloed(!reloed)
console.log('cleat alll item from cart',api)
}


// shiping adress 
const shipingAddress = async (fullName,country,state,city,pincode,phoneNumber, adress) => {
  const api = await axios.post(`${url}/adress/add/`,{fullName,country,state,city,pincode,phoneNumber, adress},{
    headers: {
      "Content-Type": "Application/json",
      "Auth":token
    },
    withCredentials: true
  });
  toast(api.data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
  
  return api
}

const getAddress = async (fullName,country,state,city,pincode,phoneNumber, adress) => {
  const api = await axios.get(`${url}/adress/get/`,{
    headers: {
      "Content-Type": "Application/json",
      "Auth":token
    },
    withCredentials: true
  });
  
  setUserAdress(api.data.userAdrss)

}
useEffect(() => {
  getAddress();
}, []);
  return (
    <AppContext.Provider value={{
      products,
      RegisterUser,
      LoginUser,
      isAuthent,
      setIsAuthent,
      token,
      url,
      filterProducts,
      setFilteredProducts,
      logOutUser,
      isAuthent,
      user,
      addToCart,
      buyNowProduct, 
      setBuyNowProduct,
      cart,
      cartloed,
      decraseQty,
      removeProduct,
      clearCart,
      shipingAddress,
      userAdress
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
