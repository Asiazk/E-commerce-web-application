import React, { useContext } from 'react';
import { useState } from 'react';
import { authAdmin } from '../services/AdminService';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminSignIn = () => {

    const initialLoginState = {
        name: "",
        password: ""
    }

    const [admin, setAdmin] = useState(initialLoginState);

    const { handleLogin } = useContext(AuthContext);
    const navigator = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        const targetName = e.target.name;
        setAdmin({...admin, [targetName]: value}); // ... = deconstruct an array or object into separate variables
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        authAdmin(admin).then((response) => {
            console.log(response);
            alert("Admin logged successfully");
            handleLogin();
            navigator("/");
            window.location.reload();

        }).catch ((error) => {
            alert("Wrong details");
            console.log(error);
            setAdmin(initialLoginState);
            window.location.reload();
        })
    }

    return (<>
        <form onSubmit={handleSubmit} className='flex max-w-2xl'>
            <div className='absolute top-14 px-32 bg-transparent'>
                <div className='text-2xl'>
                <h1>Admin</h1>
                </div>
                <div className='items-center justify-center h-14 w-full my-2'>
                <label className='block'>Name</label>
                <input 
                    autoComplete='off'
                    required
                    name='name' 
                    value={admin.name} 
                    onChange={(e) => handleChange(e)} // when this input changes we call function handle change
                    type='text' 
                    className='h-8 border px-2 py-2'></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-2'>
                <label className='block'>Password</label>
                <input 
                    required
                    name='password' 
                    value={admin.password} 
                    onChange={(e) => handleChange(e)} // when this input changes we call function handle change
                    type='password' 
                    className='h-8 border px-2 py-2'></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-4 space-x-3'>
                <button 
                    className='rounded text-white bg-purple-600 py-2 px-6 hover:bg-purple-800'>Sign In</button>
                </div>
            </div>
        </form>
        </>
  )
}
