import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function UserAccount() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>

        {user.id==id &&
        <>
        <div className='flex flex-col absolute top-14 px-32 bg-transparent'>
            <h3 className='text-2xl py-3'>User Details</h3>
            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th className='text text-white'>First Name</th> 
                        <th className='text-white'>Last Name</th>
                        <th className='text-white'>Email</th>
                        <th className='text-white'>Phone</th>
                        <th className='text-white'>City</th>
                        <th className='text-white'>Street</th>
                        <th className='text-white'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={user.id} className='border-b'>
                        <td className='text-left px-10 py-2'>{user.firstName}</td>
                        <td className='text-left px-10 py-2'>{user.lastName}</td>
                        <td className='text-left px-10 py-2'>{user.emailId}</td>
                        <td className='text-left px-10 py-2'>{user.phone}</td>
                        <td className='text-left px-10 py-2'>{user.city}</td>
                        <td className='text-left px-10 py-2'>{user.street}</td>
                        <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                            <a
                            onClick={() => navigate(`/updateUser/${id}`)}
                            className='text-emerald-500 hover:text-emerald-600 px-4 cursor-pointer'>
                                Edit Details
                            </a></td>
                    </tr>
                </tbody> 
            </table>
        </div>
        </>

        }
    
        </>
  )
}




