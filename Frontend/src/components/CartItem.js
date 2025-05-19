import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { getProductById } from "../services/ProductService";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from "@mui/material/colors";

export const CartItem = ({ id, amount, price }) => {
    const { getTotalCartAmount, checkout, addToCart, reduceFromCart, deleteItem } = useContext(ShopContext);
    const [item, setItem] = useState("");

    const fetchItem = async (itemId) => {
        try {
            const {data} = await getProductById(itemId);
            console.log(data);

            setItem(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        deleteItem(id);
        window.location.reload();
    }

    useEffect(() => {
        fetchItem(id);
    }, [])

    useEffect(() => {
        getTotalCartAmount();
    },[])
    
    return (
        <div  className="border-solid">
            <img src={item.imageUrl} style={{width:"10",height:"10"}}/>
            <div>
                <p>
                    <b>{item.itemName}</b>
                </p>
                <p>Price: {item.price}₪ </p>
                <p>Total: {item.price*amount}₪</p>
                <p>Items: {amount}</p>
            <div className="flex-row flex text-xl space-x-3 px-1 ">
                <button onClick={() => amount > 1 && reduceFromCart({id:id, amount:amount, price:price})}
                        className="hover:text-red-600 text-gray-800 font-bold text-2xl">
                    -
                </button>

                <button onClick={() => addToCart({id:id, amount:1, price:price})} 
                        className=" hover:text-green-600 text-gray-800 font-bold text-2xl">
                    +
                </button>
                <div>
                    <DeleteForeverIcon onClick={() => handleDelete()} className="hover: cursor-pointer" sx={{ color: red[900] }} fontSize="small" />
                </div>
            </div>
            </div>
        </div>

    )




}