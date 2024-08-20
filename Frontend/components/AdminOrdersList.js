import React, { useContext } from 'react';
import { changeOrderStatus, getAllOrders } from '../services/OrderService';
import { useEffect } from 'react';
import { useState } from 'react';
import Collapsible from 'react-collapsible';
import AuthContext from '../context/AuthContext';
import { TextField } from '@mui/material';

const AdminOrdersList = () => {
    const [loading, setLoading] = useState(true);
    const [allOrders, setAllOrders] = useState([]);
    const [editMode, setEditMode] = useState(0);
    const ORDER_STATUS = ["ACCEPTED", "PROCESSING", "SENT", "CANCELED"];
    const [newStatus, setNewStatus] = useState("");
    const { user } = useContext(AuthContext);
    const [searchInput, setSearchInput] = useState("");
    const [FilteredOrders, setFilteredOrders] = useState("")

    useEffect(() => {
        const fetchOrdersData =  async () => { // async means the code continues while waiting for response
            setLoading(true);

            try {
                const response =  await getAllOrders();
                setAllOrders(response.data);
                console.log(response.data)
                
            } catch(error) {
                console.log(error);
            }
            setLoading(false);

        };
        fetchOrdersData();
    }, [])

    const handleStatusChange = async (e, orderId) => {
        e.preventDefault();
        
        try {
            const response = await changeOrderStatus(orderId, newStatus);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setEditMode(0);
        window.location.reload();
    }

    const handleEdit = (id) => {
        setEditMode(id);
    }

    const handleSelect = (e) => {
        e.preventDefault();
        setNewStatus(e.target.value);
    }

    const inputHandler = (e) => {

        const term = e.target.value;
        setSearchInput(term);
      }
  
  
    return (
        <>
        {allOrders.length > 0 && user.role==='ADMIN'?
    <>
    
        <div className='flex flex-col absolute top-14 px-32 bg-transparent space-y-3'>
            <h3 className='text-2xl py-3'>Users Orders</h3>
            <TextField
                className='border-x-white'
                variant='outlined'
                id='outlined-basic'
                fullWidth
                size='small'
                label='Search orders'
                style={{ borderColor: 'white', width: '300px',  }}
                InputLabelProps={{ style: { color: 'black'} }}
                InputProps={{ style: { color: 'gray' } }} 
                onChange={inputHandler}
                value={searchInput}
            />

            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th className='text-white'>Order Id</th> 
                        <th className='text-white'>User Id</th> 
                        <th className='text-white'>Date</th>
                        <th className='text-white'>Items</th>
                        <th className='text-white'>Total Amount</th>
                        <th className='text-white'>Status</th>
                        <th className='text-white'>Actions</th>
                    </tr>
                </thead>
                {!loading && (
                <tbody>
                    {allOrders.map((orders) => (orders.filter((order) => order.id==searchInput || order.userId==searchInput || searchInput=="" || searchInput.includes(order.orderStatus)).map((order) => 
                    <tr className='border' key={order.id}>
                        <td className='text-left px-10 py-2'>{order.id}</td>
                        <td className='text-left px-10 py-2'>{order.userId}</td>
                        <td className='text-left px-10 py-2'>{new Date(order.date).toLocaleTimeString()},{new Date(order.date).toLocaleDateString()}</td>
                            <Collapsible className="text-left py-2" trigger="Click to see items">
                        {order.orderItemDetails.map((item) => 
                        <tr  className='text-blue-700 text-left py-2' key={item.productId}>
                            • {item.name + " x " + item.amount}
                        </tr>)}</Collapsible>
                        <td className='text-left px-10 py-2'>{order.totalAmount}₪</td>
                        <td className='text-left px-10 py-2'>
                            {editMode===order.id ? 
                            <form>
                                <select className='border border-purple-400'defaultValue={order.orderStatus} onChange={handleSelect}>
                                    <option value="ACCEPTED">ACCEPTED</option>
                                    <option value="PROCESSING">PROCESSING</option>
                                    <option value="SENT">SENT</option>
                                    <option value="CANCELED">CANCELED</option>
                                </select>
                            <button type='submit' className='text-sm text-purple-500 hover:text-purple-700 cursor-pointer font-bold'
                                     onClick={(e) => handleStatusChange(e, order.id)}>Save</button>
                            </form>
                            : order.orderStatus
                            }
                        </td>
                        {order.orderStatus!="SENT" && order.orderStatus!="CANCELED" ? 
                        <td> <button onClick={() => handleEdit(order.id)} 
                            className='text-left px-10 py-2 text-emerald-500 
                                     hover:text-emerald-600 cursor-pointer font-bold'>Edit</button></td> : ""}
                    </tr>
                
                    ))
                    )}

                </tbody>
                  )} 
            </table>
            
        </div>
        <div className="absolute top-0 right-0 float-right p-4 flex py-20">
        </div>

    </> : <div className='absolute top-14 px-40 py-40 font-bold text-3xl'>No previous orders</div>}
    </>
  )
}

export default AdminOrdersList;