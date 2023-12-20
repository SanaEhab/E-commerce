import Layout from './Layout.jsx';
import Home from './../components/web/home/Home.jsx';
import Categories from './../components/web/categories/Categories.jsx';
import Register from './../components/web/register/Register.jsx';
import Login from './../components/web/login/Login.jsx';
import Dashboard from './Dashboard.jsx';
import HomeDashboard from './../components/dashboard/home/Home.jsx';
import CategoriesDashboard from './../components/dashboard/categories/Categories.jsx';
import CategoriesDetails from './../components/web/categories/CategoriesDetails.jsx';
import Product from './../components/web/products/Product.jsx';
import Cart from './../components/web/cart/Cart.jsx';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/web/protectedRoute/ProtectedRoute.jsx';
import Profile from '../components/web/profile/Profile.jsx';
import SendCode from '../components/web/password/SendCode.jsx';
import ForgetPass from '../components/web/password/ForgetPass.jsx';
import UserInfo from '../components/web/profile/UserInfo.jsx';
import UserContact from '../components/web/profile/UserContact.jsx';
import UserOrder from '../components/web/profile/UserOrder.jsx';
import Order from '../components/web/order/Order.jsx';



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          index:true,
          element: <Home/>
        },
        {
          path: "categories",
          element: <Categories/>
        },
        {
          path: "products/category/:categoryId",
          element: <CategoriesDetails/>
        },
        {
          path: "products/:productId",
          element: <Product/>
        },
        {
          path: "*",
          element: <h2>Page not found</h2>
        },
        {
          path:"register",
          element: <Register/>
        },
        {
          path:"login",
          element: <Login/>

        },
        {
          path:"cart",
          element:
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute> 
        },
        {
            path:"profile",
            element:
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>,
              children:[
                {
                  index:true,
                  element: <UserInfo/>
                },
                {
                  path:"contact",
                  element: <UserContact/>
                },
                {
                  path:"order",
                  element: <UserOrder/>
                }
              ]
        },
        {
          path:"sendcode",
          element: <SendCode/>
        },
        {
          path:"forgetpass",
          element: <ForgetPass/>
        },
        {
          path:"order",
          element: <Order/>
        }
  
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
      children:[
        {
          path: "home",
          element: <HomeDashboard/>
        },
        {
          path: "categories",
          element: <CategoriesDashboard/>
        },
        {
          path: "*",
          element: <h2>Page not found</h2>
        }
      ]
    }
  ]);
