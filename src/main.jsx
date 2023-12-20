import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserContextProvider from './components/web/context/User.jsx';
import App from './App.jsx'
import './index.css' 
import { CartContextProvider } from './components/web/context/CartContext.jsx';
import OrderContextProvider from './components/web/context/OrderContext.jsx';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // context order not important but if there is a context that depends on other one the parent should be before the child
  <>
  <UserContextProvider>
    <CartContextProvider>
      <OrderContextProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        <App />
      </QueryClientProvider>
      </OrderContextProvider>
      </CartContextProvider>
  </UserContextProvider>
  </>
  
)

