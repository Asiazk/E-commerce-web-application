import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function UserBoard({ username }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
  
    return (
    <div className="absolute top-0 right-0 float-right p-4 flex py-24">
    <div className='flex flex-col items-center justify-center h-14 w-full my-4 space-y-2'>
            {user && <span 
            className="bg-purple-100 text-purple-800 text-xl 
                  font-medium me-2 px-2.5 py-0.5 
                  rounded-full 
                  dark:bg-purple-900
                  dark:text-purple-300">Hello ,{username}</span>}
        <button onClick={() => navigate(`/account/${user.id}`)} className='rounded text-white bg-blue-600 py-2 px-6 hover:bg-blue-700'>My Account</button>
        <button onClick={() => navigate(`/orders/${user.id}`)}className='rounded text-white bg-pink-700 py-2 px-6 hover:bg-pink-800'>Previous Orders</button>
        </div>
    </div>
  )
}
