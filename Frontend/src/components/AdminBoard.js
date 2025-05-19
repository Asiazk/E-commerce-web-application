import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminBoard() {
    const navigate = useNavigate();
  
    return (
    <div className="absolute top-0 right-0 float-right p-4 flex py-28 z-20">
    <div className='flex flex-col items-center justify-center h-14 w-full my-4 space-y-2'>
    <span 
            className="bg-teal-100 text-teal-800 text-xl 
                  font-medium me-2 px-2.5 py-0.5 
                  rounded-full 
                  dark:bg-teal-900
                  dark:text-teal-300">Admin</span>
        <button onClick={() => navigate("/productsList")} className='rounded text-white bg-teal-500 py-2 px-6 hover:bg-teal-600'>Edit Products/Stock</button>
        <button onClick={() => navigate("/allOrders")} className='rounded text-white bg-teal-600 py-2 px-6 hover:bg-slate-700'>Edit Orders</button>
        <button onClick={() => navigate("/users")} className='rounded text-white bg-teal-700 py-2 px-6 hover:bg-slate-800'>All Users</button>
        </div>
    </div>
  )
}
