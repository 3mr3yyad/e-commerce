import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import Product from './component/Product/Product';
import Cart from './component/Cart/Cart';
import Login from './component/Login/Login';
import SignUp from './component/Signup/Signup';
import Notfound from './component/Notfound/Notfound';
import ForgetPassword from "./component/forgetPassword/forgetPassword";
import UpdatePasword from "./component/UpdatePassword/UpdatePasword";
import Brands from "./component/Brands/Brands";
import Category from "./component/Category/Category";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectingRouting from "./ProtectingRouting/ProtectingRouting";
import ProductDetails from './component/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  let router = createBrowserRouter([
    {
      path: 'e-commerce', element: <Layout />,
      children: [
        { index: true, element: <ProtectingRouting> <Home /> </ProtectingRouting> },
        { path: 'product', element: <ProtectingRouting> <Product /> </ProtectingRouting> },
        { path: 'cart', element: <ProtectingRouting> <Cart /> </ProtectingRouting> },
        { path: 'brands', element: <ProtectingRouting> <Brands /> </ProtectingRouting> },
        { path: 'category', element: <ProtectingRouting> <Category /> </ProtectingRouting> },
        { path: 'product-details/:id', element: <ProtectingRouting> <ProductDetails /> </ProtectingRouting> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <SignUp /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'update-password', element: <UpdatePasword /> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])
  let client = new QueryClient()
  return (

    <>
      <QueryClientProvider client={client}>
      
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>

    </>
  )
}
