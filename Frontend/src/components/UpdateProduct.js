import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProductDb, saveImage } from "../services/ProductService";
import { useState, useRef, useEffect } from "react";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const inputChooseFile = useRef();

    const fetchProduct = async (id) => {
        try {
            const {data} = await getProductById(id);
            console.log(data);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateImage = async (e) => {
        if (e.target.files[0].name.match(/\.(JPEG|JPG|PNG|GIF|SVG|BMP|TIFF|WEBP|ICO|HEIC|HEIF)$/i)
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

    const updateProduct = async (e) => {
        e.preventDefault(); // disable refreshing of the page
        await updateProductDb(id, product);
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await saveImage(formData);
        } catch (error) {
            console.log(error);
        }
        alert("Product updated successfully!")
        navigate("/productsList");
    };

    useEffect(() => {
        fetchProduct(id);
    }, []);

    return (
        <form onSubmit={updateProduct} className='flex max-w-2xl'>
    <div className='absolute top-14 px-32 bg-transparent'>
        <div className='text-2xl'>
        <h1>Update Product</h1>
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
            type='number' min="0"
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
                <input 
                    name='image' 
                    type="file" 
                    accept="image/*" 
                    ref={inputChooseFile}
                    onChange={updateImage}
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
        <button onClick={() => navigate("/productsList")} type='button' className='rounded text-white bg-red-700 py-2 px-6 hover:bg-red-800'>Cancel</button>
        </div>
    </div>
    </form>   
    );
};

export default UpdateProduct;