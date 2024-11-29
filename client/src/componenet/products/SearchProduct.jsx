
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useParams } from 'react-router-dom'

function SearchProduct() {
    const { products } = useContext(AppContext)
    const [searchProduct, setSearchProducts] = useState([])

    const { term } = useParams()
    console.log(useParams())

    useEffect(() => {
        if (!products) return;

        const filteredProducts = products.filter((data) =>
            data?.title?.toLowerCase().includes(term.trim()?.toLowerCase())
        );

console.log(filteredProducts)
        setSearchProducts(filteredProducts);
    }, [term, products]);

    if (searchProduct.length === 0) return <div className='text-red-600 shadow-md text-center flex flex-col justify-center font-bold mt-4 text-2xl h-screen'>
        <h1 className=' items-center'>!! Sorry We dont have any such products   </h1>
        <div className='flex justify-center mt-4'> <img className='h-14 bg-black shadow-lg rounded-full' src={'https://fonts.gstatic.com/s/e/notoemoji/latest/2639_fe0f/512.webp'}/> </div>
        </div>

    return (
        <>
            {searchProduct.length > 0 && (<div className='text-center  text-black'>
                <h1 className='text-2xl font-bold my-4 underline'>Your searched products</h1>

                <div className='flex  my-4 grid grid-cols-3 gap-y-8 '>
                    {searchProduct.map((data) => {
                        return (
                            <div className="bg-white mx-auto rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm" key={data._id}>
                                <div className="relative">
                                    <img className="max-w-[65%] mx-auto pt-4" src={data.imgSrc} alt="Product Image" />
                                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                                    </div>
                                </div>
                                <div className="p-4 ">
                                    <h3 className="text-lg font-medium mb-2">TITLE: {data.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4"><span>DISCRIPTON: {data.discrition}</span></p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg"><span>Rs .</span>{data.price}</span>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            )}
        </>
    )
}

export default SearchProduct
