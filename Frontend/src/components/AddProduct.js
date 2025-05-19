import React, { useContext, useRef, useState }  from 'react';
import {  saveImage, saveProductDb } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function AddProduct() {
    const initialProductState = {
        id: "",
        itemName: "",
        description: "",
        price: "",
        quantity: "",
      }

      const [product, setProduct] = useState(initialProductState);
      const [file, setFile] = useState("");
      const [uploaded, setUploaded] = useState(false);
      const navigate = useNavigate();
      const inputChooseFile = useRef();
      const { user } = useContext(AuthContext);

      const handleFileChange = (e) => {
        if (e.target.files[0] && e.target.files[0].name.match(/\.(JPEG|JPG|PNG|GIF|SVG|BMP|TIFF|WEBP|ICO|HEIC|HEIF)$/i)
            && e.target.files
            && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploaded(true);
        }
        else {
            alert('not an image');
            e.target.value = null;
            setFile("");
            setUploaded(false);
        }
      }
        
      const handleChange = (e) => {
        const value = e.target.value;
        const targetName = e.target.name;
        setProduct({...product, [targetName]: value});
      }

      const handleClear = () => {
        setProduct(initialProductState);
      }
      
      const saveProduct = async (event) => {
        event.preventDefault(); // disable refreshing of the page
        
        try { // first save the product, get the product id and then save the image
            const {data} =  await saveProductDb(product);
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', data.id);
            console.log(data)
            const {data: imageUrl} = await saveImage(formData);
            setFile(""); 
            inputChooseFile.current.value = "";
            setProduct(initialProductState);
            alert('Product added successfully!');
            console.log(product)
            setUploaded(false);
            navigate("/productsList");
        } catch (error) {
            console.log(error);
        }
        };
    
    return (
      
      <>
      {user.role=='ADMIN' ?
        <form onSubmit={saveProduct} className='flex max-w-2xl'>
      <div className='absolute top-14 px-32 bg-transparent'>
        <div className='text-2xl'>
          <h1>Add Product</h1>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Item Name</label>
          <input 
            autoComplete='off'
            required
            name='itemName' 
            value={product.itemName} 
            onChange={(e) => handleChange(e)} // when this input changes we call function handle change
            type='text' 
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Description</label>
          <input 
            autoComplete='off'
            required
            name='description' 
            value={product.description} 
            onChange={(e) => handleChange(e)}
            type='text' 
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Price</label>
          <input 
            autoComplete='off'
            required
            name='price' 
            value={product.price}
            onChange={(e) => handleChange(e)}
            type='number' min="1"
            className='h-8 border px-2 py-2'></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-2'>
          <label className='block'>Quantity</label>
          <input 
            required
            name='quantity' 
            value={product.quantity} 
            onChange={(e) => handleChange(e)}
            type='number' min="0"
            className='h-8 border px-2 py-2'></input>
        </div>

        <div>
        <label className='block'>Image</label>
            <div className='flex-row flex'>
                <input required 
                       name='image' 
                       type="file" 
                       accept="image/*" 
                       ref={inputChooseFile}
                       onChange={handleFileChange}
                        />

                {uploaded && <div className='py-1 text-lime-500 font-bold'>Uploaded ✓</div>}
            </div>
        </div>
        <div className='items-center justify-center h-14 w-full my-20 space-x-3'>
          <button 
            type='submit'
            className='rounded
                     text-white 
                     bg-blue-600 py-2 px-6
                     hover:bg-blue-800'>Save</button>
          <button onClick={handleClear} type='button' className='rounded text-white bg-red-700 py-2 px-6 hover:bg-red-800'>Clear</button>
          <button onClick={() => navigate("/productsList")} type='button' className='rounded text-white bg-purple-600 py-2 px-6 hover:bg-purple-800'>Back to table</button>
        </div>
      </div>
    </form>
    : <div className='absolute top-14 px-40 py-40 text-red-700 font-bold text-3xl'>Unauthorized</div>}
    </> 
  )
}
