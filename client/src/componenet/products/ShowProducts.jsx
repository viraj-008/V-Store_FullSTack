import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function ShowProducts() {
  const {  filterProducts, addToCart } = useContext(AppContext);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 px-4" >
      {filterProducts?.map((data) => (
        <div data-aos="fade-right"
          className="bg-white mb-4 lg:min-w-[310px]  max-w-[400px]  rounded-lg shadow-lg overflow-hidden ring-2 ring-red-700 ring-opacity-40 mx-auto"
          key={data._id}
        >
          <div className="relative" >
            <Link to={`/product/${data._id}`}>
              <img
                className="w-full h-40 object-contain p-2"
                src={data.imgSrc}
                alt="Product"
              />
            </Link>
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
              SALE
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-600  mb-2">
              <span className='text-black font-bold'>TITLE:</span> {data.title}
            </h3>
            <p className="text-gray-600 text-xs mb-4">
             <span className='text-black font-semibold'>DESCRIPTION:</span>  {data.discrition}
            </p>

          <div > 
            <div className="flex  items-center justify-between">
              <span className="font-bold text-sm text-black">
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
                className="bg-blue-500 text-[8px]  sm:text-[10px] hover:bg-blue-600 text-white font-bold py-1 px-2 rounded "
              >
                Add to Cart
              </button>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowProducts;
