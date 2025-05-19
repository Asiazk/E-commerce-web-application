import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from '../services/ProductService';
import { ShopContext } from "../context/ShopContext";
import AuthContext from "../context/AuthContext";

export default function StoreItem() {
    const { id } = useParams();
    const [item, setItem] = useState("");
    const { updateItemAmount } = useContext(ShopContext);
    const { user, getCurrentUser } = useContext(AuthContext);

    const fetchItem = async (itemId) => {
        try {
            const {data} = await getProductById(itemId);
            console.log(data);
            setItem(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchItem(id);
    }, [])
    
    useEffect(() => {
        getCurrentUser();
        }, [user]);

    return (
        <div className="absolute bg-blue-100 rounded-3xl shadow-lg p-20 top-24 left-80">
            <div className="text-pretty text-cyan-500 text-3xl space-y-3 text-center flex-col flex items-center">
                <h1 className="text-4xl underline">{item.itemName}</h1>
                <p>Price: {item.price}₪</p>
                <p>{item.description}</p>
                <a href={item.imageUrl}><img src={item.imageUrl} style={{width:"3",height:"5"}}/></a>
                {user && user.role==='USER' ? 
                (item.quantity > 0) ?  
                <button 
                    className="bg-blue-500
                               hover:bg-blue-700 
                               text-white font-bold py-2 px-4 
                                 text-xl
                                 rounded-full"
                    onClick={() => updateItemAmount({id:id,amount:1,price:item.price})}>Add to cart</button>
                    : (<p>out of stock</p>) : <p>please sign in to shop</p>}
                    
            </div>
        </div>
    )

}
