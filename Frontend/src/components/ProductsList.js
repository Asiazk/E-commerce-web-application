import React, { useState, useEffect, useContext } from 'react'
import { getProducts, deleteProductDb } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProductsList = () => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const editProduct = (e, id) => {
        e.preventDefault();
        navigate(`/editProduct/${id}`);
    }

    const deleteProduct = async (e, id) => {
        if (window.confirm("Are you sure you want to delete the item?") == true) {
            await deleteProductDb(id);
        }
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => { // async means the code continues while waiting for response
            setLoading(true);
            try {
                const response = await getProducts();
                setItems(response.data);
                console.log(response)
                
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
        
    }, [])
  
    return (
        <>
        {user.role=='ADMIN' ?
    <>
        <div className='flex flex-col absolute top-14 px-32 bg-transparent'>
            <h3 className='text-2xl py-3'>Store Items List</h3>
            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th className='text-white'>Item Name</th> 
                        <th className='text-white'>Price</th>
                        <th className='text-white'>Quantity</th>
                        <th className='text-white'>Description</th>
                        <th className='text-white'>Image</th>
                        <th className='text-white'>Actions</th>
                    </tr>
                </thead>
                {!loading && (
                <tbody>
                    {items.map((item) => (
                    <tr key={item.id} className='border-b'>
                        <td className='text-left px-10 py-2'>{item.itemName}</td>
                        <td className='text-left px-10 py-2'>{item.price}₪</td>
                        <td className='text-left px-10 py-2'>{item.quantity}</td>
                        <td className='text-left px-10 py-2'>{item.description}</td>
                        <td className='text-left px-10 py-2'><div><a href={item.imageUrl}><img src={item.imageUrl} style={{width:"10vh",height:"5vw"}}/></a> </div></td>

                        <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                            <a
                            onClick={(e, id) => editProduct(e, item.id)}
                            className='text-emerald-500 hover:text-emerald-600 px-4 cursor-pointer'>
                                Edit
                            </a>
                            <a
                            onClick={(e, id) => deleteProduct(e, item.id)}
                            className='text-red-500 hover:text-red-600 px-4 cursor-pointer'>
                                Delete
                            </a>
                        </td>
                    </tr> ))}
                </tbody> )}
            </table>  
        </div>
        <div className="absolute top-0 right-0 float-right p-4 flex py-20">
        <div className='flex flex-col items-center justify-center h-14 w-full my-56 space-y-2 z-50'>
            <button onClick={() => navigate("/addProduct")} className='rounded text-white bg-purple-500 py-2 px-6 hover:bg-purple-600'>Add new Product</button>
            <button onClick={() => navigate("/")} className='rounded text-white bg-purple-600 py-2 px-6 hover:bg-purple-700'>Back to admin page</button>
        </div>
        </div>
    </> : <div className='absolute top-14 px-40 py-40 text-red-700 font-bold text-3xl'>Unauthorized</div>}
    </>
  )
}

export default ProductsList;
