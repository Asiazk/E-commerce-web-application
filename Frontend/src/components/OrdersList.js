import React, { useState, useEffect, useContext } from 'react'
import { getAllUserOrders } from '../services/OrderService';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Collapsible from 'react-collapsible';


const OrdersList = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData =  async () => { // async means the code continues while waiting for response
            setLoading(true);

            try {
                const response =  await getAllUserOrders(id);
                setOrders(response.data);
                console.log(response.data)
                
            } catch(error) {
                console.log(error);
            }
            setLoading(false);

        };
        fetchOrderData();
    }, [])

  
    return (
        <>
        {orders.length > 0 && id==user.id?
    <>
        <div className='flex flex-col absolute top-14 px-32 bg-transparent'>
            <h3 className='text-2xl py-3'>Previous Orders</h3>
            
            <table className='min-w-72 shadow border-blue-500'>
                <thead className='bg-slate-700'>
                    <tr>
                        <th className='text-white'>Order Id</th> 
                        <th className='text-white'>Date</th>
                        <th className='text-white'>Items</th>
                        <th className='text-white'>Total Amount</th>
                        <th className='text-white'>Status</th>
                    </tr>
                </thead>
                {!loading && (
                <tbody>
                    {orders.map((order) => (
                    <tr key={order.id} className='border-b'>
                        <td className='text-left px-10 py-2'>{order.id}</td>
                        <td className='text-left px-10 py-2'>{new Date(order.date).toLocaleTimeString()},{new Date(order.date).toLocaleDateString()}</td>
                            <Collapsible className="text-left py-2" trigger="Click to see items">
                        {order.orderItemDetails.map((item) => 
                        <tr  className='text-blue-700 text-left py-2' key={item.productId}>
                            • {item.name + " x " + item.amount }
                        </tr>)}</Collapsible>
                        <td className='text-left px-10 py-2'>{order.totalAmount}₪</td>
                        <td className='text-left px-10 py-2'>{order.orderStatus}</td>
                    </tr> ))}
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

export default OrdersList;



