
import { useContext, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";
import uuid from "react-uuid";
import AuthContext from "../context/AuthContext";

export default function Cart  () {
    const { cart, totalAmount, getTotalCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // console.log(cart)
    // console.log(user)
    
    useEffect(() => {
        getTotalCartAmount();
        
    },[])

    return (
        <><div className="flex flex-col">
            <h1>Cart Items</h1>
            <p>Total Cart: {totalAmount}₪</p>
        </div>
        <div className="space-y-3">
            {cart && cart.map((item) => (<div  key={uuid()}>{cart.length>0 && <CartItem id={item.id} amount={item.amount} price={item.price}/>}
            </div>))}
            {totalAmount? <button onClick={() => navigate(`/order/${user.id}`)} className='rounded font-bold text-pink-600 px-1 hover:text-pink-800'>Checkout</button>:""}
        </div>
            
        </>
    )


};
