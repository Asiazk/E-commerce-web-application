import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from "react"
import uuid from 'react-uuid';
import  Cart  from './Cart';
import AuthContext from '../context/AuthContext';

export default function SideMenuCart() {
    const { user } = useContext(AuthContext);
    
    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        
        <Sidebar key={uuid()}  className='bg-indigo-500 h-full z-50' collapsed={collapsed}>
        <Menu key={uuid()}>
            <MenuItem key={uuid()} icon={<ShoppingCartIcon color='primary' fontSize='large' />}></MenuItem>
            {(user && user!={}) && <Cart />}
        </Menu>
    </Sidebar>
   );
}

