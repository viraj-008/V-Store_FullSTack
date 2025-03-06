
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useParams } from 'react-router-dom'

function SearchProduct() {
    const { products ,addToCart } = useContext(AppContext)
    const [searchProduct, setSearchProducts] = useState([])

    const { term } = useParams()

    useEffect(() => {
        if (!products) return;

        const filteredProducts = products.filter((data) =>
            data?.title?.toLowerCase().includes(term.trim()?.toLowerCase())
        );

        setSearchProducts(filteredProducts);
    }, [term, products]);

    if (searchProduct.length === 0) return <div className='text-red-600 shadow-md text-center flex flex-col justify-center font-bold mt-4 text-2xl h-screen'>
        <h1 className=' items-center'>!! Sorry We dont have any such products   </h1>
        <div className='flex justify-center mt-4'> 
           <img className='h-14 bg-black shadow-lg rounded-full' src={'https://fonts.gstatic.com/s/e/notoemoji/latest/2639_fe0f/512.webp'}/>
         </div>
        </div>

    return (
        <>
            {searchProduct.length > 0 && (<div className='text-center  text-black'>
                <h1 className='text-2xl font-bold my-4 underline' >Your searched products</h1>

                <div className='flex  my-4 grid grid-cols-2 p-4 md:grid-cols-3  gap-x-8 '>
                {searchProduct.map((data) => {
    return (
        <div data-aos="fade-up"
            className="bg-white mx-auto m-2 rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
            key={data._id}
        >
            <div className="relative">
                <img
                    className="w-full h-auto mx-auto pt-4 sm:max-w-[80%] md:max-w-[70%] lg:max-w-[65%]"
                    src={data.imgSrc}
                    alt="Product Image"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium">
                    SALE
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2">
                    <span className='font-bold'>TITLE: </span>{data.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4">
                    <span className='font-semibold text-black'> DESCRIPTION: </span>{data.discrition}
                </p>
                <div className="flex flex-wrap items-center justify-between">
                    <span className="font-bold text-sm sm:text-base md:text-lg">
                        <span>Rs.</span>
                        {data.price}
                    </span>
                    <button   onClick={() =>
                  addToCart(
                    data._id,
                    data.title,
                    data.price,
                    1,
                    data.imgSrc
                  )
                } className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-xs sm:text-sm md:text-base">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
})}

                </div>
            </div>
            )}
        </>
    )
}

export default SearchProduct
