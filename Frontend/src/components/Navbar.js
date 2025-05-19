import React, { useState, useEffect, useContext } from 'react';
import TextField from "@mui/material/TextField"
import { getProducts } from '../services/ProductService';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => { // async means the code continues while waiting for response
      try {
          const response = await getProducts();
          setProducts(response.data);
          console.log(response)
      } catch(error) {
          console.log(error);
      }
  };
  fetchData();
  }, [])
  
  const inputHandler = (e) => {
    const term = e.target.value;
    setSearchInput(term);
  
  const filteredItems = products.filter(
    (item) => item.itemName.toLowerCase().includes(term.toLowerCase()));
  setFilteredProducts(filteredItems);
  }

  return (
    <>
    <div className='bg-purple-950 z-20 '>
      <div className='h-12 px-3 flex items-center'>
        <h1 className='text-zinc-100 hover:text-cyan-400 font-bold text-xl'><a href='/'>Asia's ecommerce website</a></h1>
        <ul className='text-zinc-300 px-10 flex flex-row items-center space-x-5'>
          {user && Object.keys(user).length === 0 && <li className='hover:text-orange-500 float-left'><a href='/login'>Login</a></li>}
          {user && Object.keys(user).length === 0 && <li className='hover:text-lime-300 float-left'><a href='/addNewUser'>Sign up</a></li>}
          {Object.keys(user).length > 0 && <li onClick={() => logout()} className='hover:text-red-600 float-left hover: cursor-pointer'>Logout</li>}
          <li>
          <div className='absolute z-50 top-2 px-40'>
            <TextField
                className='border-x-white'
                variant='outlined'
                id='outlined-basic'
                fullWidth
                size='small'
                label='Search items'
                style={{ borderColor: 'white', width: '300px',  }}
                InputLabelProps={{ style: { color: 'white'} }}
                InputProps={{ style: { color: 'white' } }} 
                onChange={inputHandler}
                value={searchInput}
              />
              <ul className='text-black rounded  bg-cyan-600 px-5 space-y-2'>
                {searchInput && filteredProducts.map(item => <li 
                    className='hover:text-neutral-400 cursor-pointer'
                    key={item.id}><a href={`/storeItems/${item.id}`}>{item.itemName}</a></li>)}
              </ul>
          </div>
          </li>    
        </ul>
      </div>
    </div>

    </>
  )
}

export default Navbar;
