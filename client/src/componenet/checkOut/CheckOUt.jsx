
import { useEffect } from 'react'
import axios from 'axios';
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const checkOut = () => {
  const { cart, buyNowProduct, decraseQty, addToCart, removeProduct, clearCart, userAdress, token } = useContext(AppContext)
  const [price, setPrice] = useState(0)
  const [qty, setQty] = useState(0)
  const [userAdressData, setUserAdressData] = useState("")

  const [text, setText] = useState("Proceed to Pay");
  const [isTemporary, setIsTemporary] = useState(false);

  const handleClick = () => {
    setText("We are unable to process payments at the moment");
    setIsTemporary(true);

    setTimeout(() => {
      setText("Proceed to Pay");
      setIsTemporary(false);
    }, 2000); // Change back after 2 seconds
  };



  useEffect(() => {
    if (!buyNowProduct && !localStorage.getItem('buyNowProduct')) {
    }
  }, [buyNowProduct]);


  useEffect(() => {
    if (buyNowProduct) {
      setQty(buyNowProduct.qty);
      setPrice(buyNowProduct.price * buyNowProduct.qty);
    } else {
      let totalQty = 0;
      let totalPrice = 0;
      cart?.items?.forEach((item) => {
        totalQty += item.qty;
        totalPrice += item.price * item.qty;
      });
      setQty(totalQty);
      setPrice(totalPrice);
    }
  }, [buyNowProduct, cart]);


  useEffect(() => {
    const userAdressDdta = async () => {
      const api = await axios.get(`http://localhost:1000/api/adress/get/`, {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
      setUserAdressData(api.data.userAdrss)
    };
    userAdressDdta()
  }, [])


  const product = buyNowProduct || JSON.parse(localStorage.getItem('buyNowProduct'));


  return (
    <>
      <div className="px-4">
        {/* Title */}
        <h1 className="text-black text-center font-extrabold text-xl md:text-2xl mb-4 underline">Order Summary</h1>

        {product
          ? <>
            <div className='text-black p-2 flex flex-col justify-center items-center'>
              <h1 className='font-bold'>TItle: {product.title}</h1>
              <img className='h-38 w-20 md:h-40 w-40  rounded-md object-cove' src={product.imgSrc} />
              <h1 className='font-bold'>RS. {product.price}</h1>
            </div>
          </>
          : cart?.items?.map((data) => {
            return (
              <div
                key={data.productId}
                className="flex flex-col md:flex-row items-center justify-between border rounded-lg p-4 bg-gray-100 shadow-sm mb-4 w-full md:w-[80%] mx-auto"
              >
                {/* Image */}
                <div className="flex-shrink-0 mb-2 md:mb-0">
                  <img src={data.imgSrc} alt="Product" className="h-20 w-20 rounded-md object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex border  w-full md:w-[60%] md:justify-between text-center md:text-left">
                  <div className="font-bold flex flex-col text-black space-y-1 md:mr-2">
                    <span>Title:</span>
                    <span>Price:</span>
                    <span>Quantity:</span>
                  </div>
                  <div className="text-red-900 flex flex-col text-center md:text-start  font-serif space-y-1">
                    <span>{data.title} </span>
                    <span>Rs. {data.price}</span>
                    <span>{data.qty}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded-md"
                    onClick={() => decraseQty(data.productId, 1)}
                  >
                    <CiCircleMinus className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded-md"
                    onClick={() =>
                      addToCart(data.productId, data.title, data.price / data.qty, 1, data.imgSrc)
                    }
                  >
                    <CiCirclePlus className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded-md"
                    onClick={() => removeProduct(data.productId)}
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })

        }

        {/* Order Summary */}
        <div className="w-full md:w-[80%] mx-auto text-black border rounded-lg p-4 bg-white shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <h1 className="font-semibold bg-green-500 text-white py-1 px-3  rounded-md">
                Quantity: {qty}
              </h1>
              <h1 className="font-semibold bg-red-500 text-white px-3 py-1 rounded-md">
                Price:  {price}
              </h1>
            </div>
          </div>

          {/* Shipping Address */}
          <h1 className="text-center font-bold underline mb-4">Shipping Address</h1>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-bold">Name:</p> <span>{userAdressData?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Address:</p> <span>{userAdressData?.adress}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">City:</p> <span>{userAdressData?.city}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">State:</p> <span>{userAdressData?.state}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Country:</p> <span>{userAdressData?.country}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Pincode:</p> <span>{userAdressData?.pincode}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Phone Number:</p> <span>{userAdressData?.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Proceed to Pay Button */}
        <div className="text-center pb-2">
          <button onClick={handleClick} disabled={isTemporary} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold">
            {text}
          </button>
        </div>
      </div>
    </>
  );

}

export default checkOut
