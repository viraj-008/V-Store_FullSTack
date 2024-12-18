import React from 'react'
import { FaUser } from "react-icons/fa";
import AppContext from '../../context/AppContext'
import { useContext } from 'react'

function Profile() {

  const {user} = useContext(AppContext)
  
  return (
  <>
    <div className='bg-sky-800  h-screen'>

    <div className='w-[90%] md:w-[40%] p-2 flex flex-col justify-center items-start border-2  mx-auto relative bg-blue-500 top-[20%]'>
     <FaUser  ></FaUser>
    <h1 className='flex'>      <div className='flex '></div><span className='text-black underline mr-2 font-semibold'>YOUR NAME -</span> {user?.name}</h1>
    <h1><span className='text-black underline mr-2 font-semibold'>YOUR EMAIL-</span> {user?.email}</h1>
    </div>

    </div>
  </>
  )
}

export default Profile
