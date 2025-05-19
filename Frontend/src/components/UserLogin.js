import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import AuthContext from '../context/AuthContext';

export default function UserLogin() {
    const { handleLogin } = useContext(AuthContext);

    const initialUserLoginState = {
        emailId: "",
        password: ""
    };
    const [userLogin, setUserLogin] = useState(initialUserLoginState);
    const navigator = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        const targetName = e.target.name;
        setUserLogin({...userLogin, [targetName]: value}); // ... = deconstruct an array or object into separate variables
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.authUser(userLogin).then((response) => { 
        console.log(response);
        alert('User logged in successfully!');
        handleLogin();
        navigator("/");
        window.location.reload();

        }).catch((error) => {
            alert('Wrong login, please try again')
            setUserLogin(initialUserLoginState)
            console.log(error);
        });
    };

    return (<>
        <form onSubmit={handleSubmit} className='flex max-w-2xl'>
            <div className='absolute top-14 px-32 bg-transparent'>
                <div className='text-2xl'>
                <h1>User Login</h1>
                </div>
                <div className='items-center justify-center h-14 w-full my-2'>
                <label className='block'>Email</label>
                <input 
                    autoComplete='off'
                    required
                    name='emailId' 
                    value={userLogin.emailId} 
                    onChange={(e) => handleChange(e)} // when this input changes we call function handle change
                    type='email' 
                    className='h-8 border px-2 py-2'></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-2'>
                <label className='block'>Password</label>
                <input 
                    required
                    name='password' 
                    value={userLogin.password} 
                    onChange={(e) => handleChange(e)} // when this input changes we call function handle change
                    type='password' 
                    className='h-8 border px-2 py-2'></input>
                </div>
                <div className='items-center justify-center h-14 w-full my-4 space-x-3'>
                <button 
                    className='rounded text-white bg-green-600 py-2 px-6 hover:bg-green-800'>Login</button>
                </div>
            </div>
        </form>
        </>
  )
}
