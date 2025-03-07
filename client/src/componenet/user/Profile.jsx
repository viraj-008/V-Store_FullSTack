import { FaUser } from "react-icons/fa";
import AppContext from '../../context/AppContext'
import { useContext } from 'react'

function Profile() {

  const {user} = useContext(AppContext)
  
  return (
  <>
    <div className='bg-gray-800  h-[900px]'>

    <div className='flex flex-col justify-center  items-center text-start p-12'>
     <FaUser className='text-8xl border rounded-full bg-black p-2' />
    
  <h1><span className='text-blue-500 text-xl'>Name: </span> {user?.name}</h1> 
  <h1><span className='text-red-400'>Email: </span> {user?.email}</h1> 
    </div>

    </div>
  </>
  )
}

export default Profile
