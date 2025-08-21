import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function ShowProducts() {
  const {  filterProducts, addToCart } = useContext(AppContext);
  console.log(filterProducts)

  return (
    <div className="">

 {filterProducts.length === 0 ? <div className='text-xl min-h-[60vh] text-center font-sans font-bold text-black p-5'>Loading...</div> : null}
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 px-4" >

      {filterProducts ? filterProducts.map((data) => (
       <div 
  data-aos="fade-right"
  className="bg-white mb-4 lg:min-w-[400px] max-w-[400px] rounded-lg shadow-lg overflow-hidden ring-2 ring-red-700 ring-opacity-40 mx-auto transition-transform duration-300 hover:shadow-xl"
  key={data._id}
>
  <div className="relative">
    <Link to={`/product/${data._id}`}>
      <img
        className="w-full h-40 object-contain p-2 transition-transform duration-300 hover:scale-105"
        src={data.imgSrc}
        alt="Product"
      />
    </Link>
    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow-md">
      SALE 
    </div>
  </div>
  <div className="p-4">
    <h3 className="text-sm font-medium text-gray-600 mb-2">
      <span className='text-black font-bold'>TITLE:</span> {data.title}
    </h3>
    <p className="text-gray-600 text-xs mb-4 line-clamp-2">
      <span className='text-black font-semibold'>DESCRIPTION:</span> {data.discrition}
    </p>

    {/* Mobile layout: Price above button */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-gray-100 gap-2">
      <span className="font-bold text-lg text-blue-700 text-center sm:text-left order-2 sm:order-1">
        Rs. {data.price}
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 order-1 sm:order-2"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>
      )) : <h1 className='text-red-800 h-7 p-5'>No Products Found</h1>}

       
    </div>
    
      </div>
  );

}

export default ShowProducts;
