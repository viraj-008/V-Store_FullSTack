import React from 'react'
import { FaUser } from "react-icons/fa";
import AppContext from '../../context/AppContext'
import { useContext } from 'react'

function Profile() {

  const {user} = useContext(AppContext)
  
  return (
  <>
    <div className='bg-sky-400  h-screen'>

    <div className='w-[40%]  mx-auto relative top-[20%]'>
    <div>    <div className='flex '><FaUser className='h-16  w-16 ' /></div></div>
    <h1 className='flex'><span className='text-black underline mr-2 font-thin'>WELCOM -</span> {user?.name}</h1>
    <h1><span className='text-black underline mr-2 font-semibold'>EMAIL-</span> {user?.email}</h1></div>

    </div>
  </>
  )
}

export default Profile
