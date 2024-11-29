import React,{useContext,useEffect,useState} from 'react'

import AppContext from '../../context/AppContext'

function RelatedProduts({category}) {
    const [relatedProduct,setRelatedProducts] = useState([])
    const {products} = useContext(AppContext)


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
    
  <div className='flex  my-4 grid grid-cols-3 gap-y-8 '>
    {relatedProduct.map((data)=>{
        return(
            <div className="bg-white mx-auto rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm" key={data._id}>
    <div className="relative">
        <img className="max-w-[65%] mx-auto pt-4" src={data.imgSrc} alt="Product Image"/>
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div className="p-4 ">
        <h3 className="text-lg font-medium mb-2">TITLE: {data.title}</h3>
        <p className="text-gray-600 text-sm mb-4"><span>DISCRIPTON: {data.discrition}</span></p>
        <div className="flex items-center justify-between">
            <span className="font-bold text-lg"><span>Rs </span>{data.price}</span>
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

export default RelatedProduts
