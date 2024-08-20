import { createContext, useEffect, useState } from "react";
import { processOrder } from "../services/OrderService";

export const ShopContext = createContext();

function load(key) {
    const item = sessionStorage.getItem(key);
    return item != null ? JSON.parse(item) : [];
}

export const ShopContextProvider = ({children}) => {
    const [cart, setCart] = useState(load('cart'));
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);
    
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);


    const getTotalCartAmount = () => {
        let total = 0
        if (cart.length !== 0) {
            cart.map((item) => {
                total += item.price * item.amount;
            })

        setTotalAmount(total);  
        }
          
    };

    const addToCart = (product) => {
        const newCart = cart.map((item) => {
            if (item.id === product.id) {
                console.log("inside if addtocart")
                return {...item, amount: item.amount + 1}
            }
            return item;
        });
        setCart(newCart);

        // console.log(cart);
    }    
    

    const reduceFromCart = (product) => {
        const newCart = cart.map((item) => {
            if (item.id === product.id) {
                console.log("inside if reduceFromCart")
                return {...item, amount: item.amount - 1};
            }
            return item;
        });
        setCart(newCart);
    };

    const updateItemAmount = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            const updatedCart = cart.map((item) => 
            item.id === product.id?
            {...item, amount:item.amount + 1} : item);
            setCart(updatedCart);
        } else {
            setCart([...cart,product])
        }
    }

    const checkout =  (userId) => {
        processOrder(userId, cart).then((response)=> {
            console.log(response);
            alert("Order submitted successfully!");
            sessionStorage.removeItem('cart');
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            sessionStorage.removeItem('cart');
        })
    };

    const deleteItem = (id) => {
        cart.map((item) => console.log(item))
        setCart(cart.filter((item) => item.id !== id));
        
        getTotalCartAmount();
        console.log(totalAmount)
       
    }

    const contextValue = {
        cart,
        setCart,
        totalAmount,
        setTotalAmount,
        reduceFromCart,addToCart,
        getTotalCartAmount,
        updateItemAmount,
        checkout,
        deleteItem
    };

    return (
        <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
    );
};
