import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { CartItem } from "./CartItem";
import AuthContext from '../context/AuthContext';

const Checkout = () => {
    const { id } = useParams();
    const { cart, checkout } = useContext(ShopContext);
    const { user } = useContext(AuthContext);
    const [payment, setPayment] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setPayment(e.target.value);
    }

    const handlePayment = (e) => {
        // Here will be credit card handling API: sending the credit details to server
        e.preventDefault();
        checkout(id);
        navigate(`/orders/${id}`);
    }


  return (
    <>{cart.length>0 && id==user.id ?
        <div className='flex flex-col absolute top-14 px-32 bg-transparent space-y-4'>
            <h3 className='text-2xl py-3'>Checkout</h3>
             
            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th className='text-white'>Items</th> 
                    </tr>
                </thead>
                {(
                <tbody className='flex flex-row space-x-7'>
                    {cart.map((item) => (
                    <tr key={item.id} className='border-b'>
                        <CartItem id={item.id} amount={item.amount} price={item.price}/>
                    </tr> ))}
                </tbody> )}
            </table>
            
                <form onSubmit={(e) => handlePayment(e)} className='flex max-w-2xl'>
                    <div className='items-center justify-center h-14 w-full my-8 space-y-3'>
                        <label className='block'>Payment Details</label>
                        <input  
                            required 
                            pattern='[0-9]*'
                            minLength={16}
                            maxLength={16}
                            type='text' 
                            autoComplete='off'
                            name='payment'
                            onChange={(e) => handleChange(e)}
                            value={payment} 
                            placeholder='Please enter 16 digits'
                            className='h-8 border px-2 py-2'></input>
                
                <button className='rounded text-white bg-green-600 py-2 px-6 hover:bg-green-800 mx-20'>Submit Order</button>
            </div>
            </form>
        </div>    
        :<div>Cart is empty</div>}</>              
  )
}

export default Checkout;