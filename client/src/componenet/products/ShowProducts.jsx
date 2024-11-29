import React from 'react'
import AppContext from '../../context/AppContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
// to={`/product/${data._id}`}

function ShowProducts() {

  const { products, filterProducts, addToCart } = useContext(AppContext)
  return (
    <div className='flex grid grid-cols-3 mt-6'>

      {filterProducts?.map((data) => {

        return (
          <div className="bg-white w-[80%]   mx-auto rounded-lg mb-6 overflow-hidden shadow-lg ring-2 ring-red-700 ring-opacity-40  max-w-sm" key={data._id}>
            <div className="relative">
              <Link to={`/product/${data._id}`}> <img className="max-w-[65%] mx-auto pt-4" src={data.imgSrc} alt="Product Image" /></Link>
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
              </div>
            </div>
            <div className="p-4 ">
              <h3 className="text-lg font-medium text-black mb-2">TITLE:-{data.title}</h3>
              <p className="text-gray-600 text-sm mb-4"><span>DISCRIPTON: {data.discrition}</span></p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-black"><span>Rs. </span>{data.price}</span>
                <button onClick={() => addToCart(data._id, data.title, data.price, 1, data.imgSrc)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Add cart
                </button>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default ShowProducts
