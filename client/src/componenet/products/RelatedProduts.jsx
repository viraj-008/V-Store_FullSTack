import {useContext,useEffect,useState} from 'react'

import AppContext from '../../context/AppContext'

function RelatedProduts({category}) 
{
    const [relatedProduct,setRelatedProducts] = useState([])
    const {products,addToCart} = useContext(AppContext)


    useEffect(() => {
        if (!products) return; // Handle empty context (optional)
    
        const filteredProducts = products.filter((data) =>
            data.category === category
        );
        setRelatedProducts(filteredProducts);
      }, [category, products]);
    
  return (
 <>
   {relatedProduct.length > 0 && ( <div className='text-center  text-black'>
        <h1 className='text-2xl font-bold my-4 underline'>RELATED PRODUTS</h1>
    
  <div className='flex  my-4 grid grid-cols-2 p-4 md:grid-cols-3  gap-x-8 '>
  {relatedProduct.map((data) => {
    return (
        <div 
            className="bg-white mx-auto  m-2 rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm sm:max-w-xs md:max-w-md lg:max-w-lg"
            key={data._id}
        >
            <div className="relative" >
                <img
                    className="w-full h-auto mx-auto pt-4 sm:max-w-[80%] md:max-w-[70%] lg:max-w-[65%]"
                    src={data.imgSrc}
                    alt="Product Image"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium">
                    SALE
                </div>
            </div>
            <div className="p-4" data-aos="slide-left"  data-aos-duration="600">
                <h3 className="text-sm sm:text-base md:text-lg font-medium mb-2">
                    <span className='font-bold'>TITLE: </span> {data.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4" data-aos="slide-left"  data-aos-duration="600">
                    <span className='text-black font-semibold'>DESCRIPTION: </span>{data.discrition}
                </p>
                <div className="flex flex-wrap items-center justify-between">
                    <span className="font-bold text-sm sm:text-base md:text-lg" data-aos="slide-left"  data-aos-duration="600">
                        <span>Rs </span>
                        {data.price}
                    </span>
                    <button  
                     onClick={() =>
                  addToCart(
                    data._id,
                    data.title,
                    data.price,
                    1,
                    data.imgSrc
                  )
                }
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-xs sm:text-sm md:text-base">
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

export default RelatedProduts
