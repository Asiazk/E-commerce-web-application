import React, { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

export default function AddNewUser() {
  const initialUserState = {
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phone: "",
    city: "",
    street: "",
  }

  const EMAIL_EXISTS_ERROR = "* Email already exists";
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const EMAIL_REGEX_ERROR = "* Invalid email";
  const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,13}$/;
  // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@\$\^!%\*&])(?=.{7,})$/;
  const PASSWORD_REGEX_ERROR = "Password must contain one digit, one lowercase letter, one uppercase letter, one special character and it must be at least 8 characters long."

  const navigator = useNavigate();
  
  // usestate is used for following an object and updating it
  const [user, setUser] = useState(initialUserState);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const targetName = e.target.name;
    if (targetName === 'emailId') {
      validateEmail(user);
    }
    if (targetName === 'password') {
      validatePassword(user);
    }
    setUser({...user, [targetName]: value}); // adding current user fields to the previous feilds
  };

  const saveUser = (e) => {
    e.preventDefault(); // disable refreshing of the page
    
    if (!emailErrorMsg && !passwordErrorMsg) { // add user only if email is valid  
      UserService.saveUser(user).then((response) => { // send save user in db
        console.log(response);
        alert('User created successfully!');
        navigator("/login"); // after adding new user navigate to login

        }).catch((error) => {
          setEmailExistsError(true);
          console.log(error);
        });
      };
      // if the email before field had a problem, now set the email error to false
    if (emailExistsError) {
      setEmailExistsError(false);
    }
    if (invalidEmailError) {
      setInvalidEmailError(false);
    }
  }

  function handleClear(e) {
    e.preventDefault();
    setUser(initialUserState);
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    setEmailExistsError(false);
    setInvalidEmailError(false);
  }

  const validateEmail = (user) => {
    if (!EMAIL_REGEX.test(user.emailId) && user.emailId !== "") {
      setEmailErrorMsg(EMAIL_REGEX_ERROR);
    }
    else {
      setEmailErrorMsg("");
    }
  }

  const validatePassword = (user) => {
    if (!PASSWORD_REGEX.test(user.password) && user.password !== "") {
      setPasswordErrorMsg(PASSWORD_REGEX_ERROR);
    }
    else {
      setPasswordErrorMsg("");
    }
  }

  return (
    <form onSubmit={saveUser} className='flex max-w-2xl'>
      <div className='absolute top-14 px-32 bg-transparent'>
        <div className='text-2xl'>
          <h1>Sign Up</h1>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>First Name</label>
          <input 
            autoComplete='off'
            required
            name='firstName' 
            value={user.firstName} 
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
            value={user.lastName} 
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
            value={user.emailId}
            onChange={(e) => handleChange(e)}
            type='email' 
            className='h-8 border px-2 py-2'></input>
        </div>
        {emailExistsError && <label className='text-red-700'>{EMAIL_EXISTS_ERROR}</label>} 
        <label className='text-red-700'>{emailErrorMsg}</label>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Password</label>
          <input 
            required
            name='password' 
            value={user.password} 
            onChange={(e) => handleChange(e)}
            type='password' 
            minLength={8}
            className='h-8 border px-2 py-2'></input>
        </div>
        <label className='text-red-700 text-sm block'>{passwordErrorMsg}</label>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Phone Number</label>
          <input 
            autoComplete='off'
            required 
            name='phone'
            value={user.phone}
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
            value={user.city}
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
            value={user.street}
            onChange={(e) => handleChange(e)}
            className='h-8 border px-2 py-2'></input>
        </div>
       
        <div className='items-center justify-center h-14 w-full space-x-3'>
          <button 
            className='rounded text-white bg-green-600 py-2 px-6 hover:bg-green-800'>Save</button>
          <button onClick={handleClear} type='button' className='rounded text-white bg-red-700 py-2 px-6 hover:bg-red-800'>Clear</button>
        </div>
      </div>
    </form>
  )
}
