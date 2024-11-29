import React, { useState } from 'react'
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'

function Address() {
 const {shipingAddress,userAdress}  = useContext(AppContext)
 const navigate = useNavigate()
const [form,setForm] =useState ({

  fullName:"",
  country:"",
    state:"",
    city:"",
    pincode:"",
    phoneNumber:"",
    adress:""
})

const hancdleChange = (e)=>{
// console.log(e.target.value)
setForm({ ...form, [e.target.name]: e.target.value });

}

const {  fullName,country,state,city,pincode,phoneNumber, adress}= form

const handleSubmit = async (e)=>{
  e.preventDefault()
setForm({
  fullName:"",
  country:"",
    state:"",
    city:"",
    pincode:"",
    phoneNumber:"",
    adress:""
})
 const result = await shipingAddress(fullName,country,state,city,pincode,phoneNumber, adress);
 console.log(result)
 if(result.data.success){
  navigate('/checkout')
 }
}

  return (
    <div className='bg-indigo-100'>
      <div >
<h1 className='text-center font-semibold text-2xl underline text-black'>Shiping Adress</h1>

<div >
    <form onSubmit={handleSubmit}>
<div className=' flex flex-col gap-3'>

<div className='flex flex-col items-center justify-center'>
<h1 className=' w-[38%] text-slate-700 font-semibold' >Full Name</h1>
<input type='text'  className='mx-auto w-[40%] border-2 rounded-md outline-none text-slate-600 p-2 ' value={form.fullName} name='fullName' onChange={hancdleChange}/>
</div>

<div className='flex flex-col items-center justify-center'>
<h1 className=' w-[38%] text-slate-700 font-semibold'>Country</h1>
<input type='text'  className='border-2 w-[40%] rounded-md outline-none text-slate-600 p-2' value={form.country} name='country'  onChange={hancdleChange} />
</div>

<div className='flex flex-col items-center justify-center'>
<h1 className=' w-[38%] text-slate-700 font-semibold'>State</h1>
<input type='text'  className='border-2  w-[40%] rounded-md outline-none text-slate-600 p-2' value={form.state} name='state'  onChange={hancdleChange} />
</div>

<div className='flex flex-col items-center justify-center'>
<h1 className=' w-[38%] text-slate-700 font-semibold'>city</h1>
<input type='text' className='border-2 w-[40%] rounded-md outline-none text-slate-600 p-2' value={form.city} name='city'   onChange={hancdleChange}/>
</div>



<div className='flex items-center justify-between w-[40%]  mx-auto'>

<div>
<h1 className=' w-[38%] text-slate-700 font-semibold'>Pincode</h1>
<input type='number'  className='border-2 w-full rounded-md outline-none text-slate-600 p-2' value={form.pincode} name='pincode'  onChange={hancdleChange} />
</div>

<div >
<h1 className=' w-full text-slate-700 font-semibold'>Phone No.</h1>
<input type='number' className='border-2 w-full rounded-md outline-none text-slate-600 p-2' value={form.phoneNumber} name='phoneNumber'  onChange={hancdleChange} />
</div>
</div>

<div className='flex flex-col items-center justify-center b'>
<h1 className=' w-[38%] text-slate-700 font-semibold '>Adress</h1>
<input type='text'  className=' h-[100px]  w-[40%] border-2 rounded-md outline-none text-slate-600 p-2' value={form.adress} name='adress'   onChange={hancdleChange} />
</div>

</div>
      <div className='py-6 font-bold w-[40%] mx-auto flex justify-evenly'>
        <button className='bg-blue-600 px-12  rounded-sm' type="submit">submit</button>
        {
          userAdress &&
          <>
        <button className='bg-yellow-600 px-8 rounded-sm' type='button' onClick={()=>navigate('/checkout')} >Use old Adress</button>

          </>
        }
      </div>

    </form>
</div>



      </div>

    </div>
  )
}

export default Address
