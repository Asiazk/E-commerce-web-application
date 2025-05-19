import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { TextField } from '@mui/material';

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [users, setusers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    

    useEffect(() => {
        const fetchData = async () => { // async means the code continues while waiting for response
            setLoading(true);
            try {
                const response = await UserService.getUsers();
                setusers(response.data);
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
        
    }, [])

    const inputHandler = (e) => {
        const term = e.target.value;
        console.log(term)
        setSearchInput(term);
      }
  
    return (
    <>{!loading &&
        <div className='flex flex-col absolute top-14 px-32 bg-transparent space-y-3'>
            <h3 className='text-2xl py-3'>Users List</h3>
            <TextField
                className='border-x-white'
                variant='outlined'
                id='outlined-basic'
                fullWidth
                size='small'
                label='Search users'
                style={{ borderColor: 'white', width: '300px',  }}
                InputLabelProps={{ style: { color: 'black'} }}
                InputProps={{ style: { color: 'gray' } }} 
                onChange={inputHandler}
                value={searchInput}
            />
            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                    <th className='text text-white'>User Id</th>
                        <th className='text text-white'>First Name</th> 
                        <th className='text-white'>Last Name</th>
                        <th className='text-white'>Email</th>
                        <th className='text-white'>City</th>
                        <th className='text-white'>Street</th>
                        <th className='text-white'>Phone</th>
                    </tr>
                </thead>
                { (
                <tbody>
                    {users.filter((user) => user.id==searchInput || searchInput=="" || user.firstName.toLowerCase().includes(searchInput.toLowerCase()
                    ) || user.lastName.toString().toLowerCase().includes(searchInput.toLowerCase()) || 
                         user.firstName.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                         user.emailId.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                         user.city.toString().toLowerCase().includes(searchInput.toLowerCase() ) ||
                         user.street.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
                         user.phone==searchInput).map((user) => (
                    <tr key={user.id} className='border-b'>
                        <td className='text-left px-10 py-2'>{user.id}</td>
                        <td className='text-left px-10 py-2'>{user.firstName}</td>
                        <td className='text-left px-10 py-2'>{user.lastName}</td>
                        <td className='text-left px-10 py-2'>{user.emailId}</td>
                        <td className='text-left px-10 py-2'>{user.city}</td>
                        <td className='text-left px-10 py-2'>{user.street}</td>
                        <td className='text-left px-10 py-2'>{user.phone}</td>
                    </tr> ))}
                </tbody> )}
            </table>
        </div>
    }</>
  )
}

export default UserList;