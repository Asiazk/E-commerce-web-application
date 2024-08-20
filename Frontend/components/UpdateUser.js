import React, { useContext, useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AuthContext from '../context/AuthContext';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const initialUserState = {
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
        phone: "",
        city: "",
        street: "",
    }

  const [currUser, setCurrUser] = useState(initialUserState);

  const fetchUser = async (userid) => {
    try {
        const {data} = await UserService.getUserById(userid);
        console.log(data);
        setCurrUser(data);
    } catch (error) {
        console.log(error);
    }
}

useEffect(() => {
    fetchUser(id);
}, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const targetName = e.target.name;

    setCurrUser({...currUser, [targetName]: value}); // adding current user fields to the previous feilds
  };

  const saveUser = (e) => {
    e.preventDefault(); // disable refreshing of the page
    
      UserService.updateUser(currUser, id).then((response) => { // send save user in db
        console.log(response);
        alert('User updated successfully! please re-sign in');
        logout();

        }).catch((error) => {
          console.log(error);
        });
  }

  return (
    <>
    {user.id==id &&
    <form onSubmit={saveUser} className='flex max-w-2xl'>
      <div className='absolute top-14 px-32 bg-transparent'>
        <div className='text-2xl'>
          <h1>Update Details</h1>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>First Name</label>
          <input 
            autoComplete='off'
            required
            name='firstName' 
            value={currUser.firstName} 
            onChange={(e) => handleChange(e)} // when this input changes we call function handle change
            type='text' 
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Last Name</label>
          <input 
            autoComplete='off'
            required
            name='lastName' 
            value={currUser.lastName} 
            onChange={(e) => handleChange(e)}
            type='text' 
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Email</label>
          <input 
            autoComplete='off'
            required
            name='emailId' 
            value={currUser.emailId}
            disabled={true}
            type='email' 
            className='h-8 border px-2 py-2 bg-slate-500'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Phone Number</label>
          <input 
            autoComplete='off'
            required 
            name='phone'
            value={currUser.phone}
            onChange={(e) => handleChange(e)}
            type='text' pattern='[0-9]*' 
            minLength={10}
            maxLength={10}
            placeholder='Please enter 10 digits'
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block font-bold underline'>Address</label>
          <label className='block'>City</label>
          <input  
            type='text' 
            required 
            autoComplete='off'
            name='city'
            value={currUser.city}
            onChange={(e) => handleChange(e)}
            placeholder='In Israel Only'
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-8'>
          <label className='block'>Street</label>
          <input  
            type='text' 
            required 
            autoComplete='off'
            name='street'
            value={currUser.street}
            onChange={(e) => handleChange(e)}
            className='h-8 border px-2 py-2'></input>
        </div>
       
        <div className='items-center justify-center h-14 w-full space-x-3'>
          <button 
            className='rounded text-white bg-green-600 py-2 px-6 hover:bg-green-800'>Save</button>
        <button onClick={() => navigate("/")} type='button' className='rounded text-white bg-red-700 py-2 px-6 hover:bg-red-800'>Cancel</button>
        </div>
      </div>
    </form>}
    </>
  )
}
