import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AddNewUser from './components/AddNewUser';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import UserList from "./components/UserList";
import UserLogin from "./components/UserLogin";
import AccessDenied from "./components/AccessDenied";
import React, { useEffect } from "react";
import AdminBoard from "./components/AdminBoard";
import ProductsList from "./components/ProductsList";
import AddProduct from "./components/AddProduct";
import Form from "./components/UploadImage";
import UpdateProduct from "./components/UpdateProduct";
import UserBoard from "./components/UserBoard";
import StoreItem from "./components/StoreItem";
import SideMenu from "./components/SideMenu";
import { ShopContextProvider } from "./context/ShopContext";
import Cart from "./components/Cart";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Checkout from "./components/Checkout";
import UserAccount from "./components/UserAccount";
import UpdateUser from "./components/UpdateUser";
import OrdersList from "./components/OrdersList";
import AdminOrdersList from "./components/AdminOrdersList";
import PrivateRoute from "./components/PrivateRoute";
import { AdminSignIn } from "./components/AdminSignIn";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  const { user, userType, getCurrentUser } = useContext(AuthContext);

    useEffect(() => {
      getCurrentUser();
      }, [user]);
  
  return (
    <>  
    <ShopContextProvider>
    <BrowserRouter> 
        
    <Navbar />    
        
        {<>{userType.admin && <AdminBoard />}
           {userType.regUser &&  
           <UserBoard username={user && user.firstName} />}</>}
        
        <SideMenu />
        <Routes>
          <Route index element={<Welcome />}></Route>
          <Route path="/addNewUser" element={<AddNewUser />}></Route>
          <Route path="/users" element={<AdminRoute><UserList /></AdminRoute>}></Route>
          <Route path ="/login" element={<UserLogin />}></Route>
          <Route path="/error/access-denied" element={<AccessDenied />}></Route>
          <Route path="/productsList" element={<AdminRoute><ProductsList /></AdminRoute>}></Route>
          <Route path="/addProduct" element={<AdminRoute><AddProduct /></AdminRoute>}></Route>
          <Route path="/upload" element={<Form />}></Route>
          <Route path="/editProduct/:id" element={<AdminRoute><UpdateProduct /></AdminRoute>}> </Route>
          <Route path="/storeItems/:id" element={<StoreItem />}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/order/:id" element={<PrivateRoute><Checkout/></PrivateRoute>}></Route>
          <Route path="/account/:id" element={<PrivateRoute><UserAccount/></PrivateRoute>}></Route>
          <Route path="/updateUser/:id" element={<PrivateRoute><UpdateUser/></PrivateRoute>}></Route>
          <Route path="/orders/:id" element={<PrivateRoute><OrdersList/></PrivateRoute>}></Route>
          <Route path="/allOrders" element={<AdminRoute><AdminOrdersList/></AdminRoute>}></Route>
          <Route path="/admin/signIn" element={<AdminSignIn/>}></Route>
        </Routes>
    </BrowserRouter>
    </ShopContextProvider>

    </>
    );
  }