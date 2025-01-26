import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Error from '../Pages/Shared/Error/Error';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
// import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from './AdminRoute';
import BookAParcel from '../Pages/Dashboard/BookAParcel/BookAParcel';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import UpdateItems from '../Pages/Dashboard/UpdateItems/UpdateItems';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
    ],
  },



{
  path: "dashboard",
  element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
  children: [
    // normal user routes
    {
      path: 'bookaparcel',
      element: <BookAParcel></BookAParcel>
    },


    {
      path: 'myparcels',
      element:<MyParcels></MyParcels>
    },

    {
      path: 'updateItem/:id',
      element: <UpdateItems></UpdateItems>,
      loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
    },

    // admin only routes
    
    {
      path: 'users',
      element: <AdminRoute> <AllUsers></AllUsers> </AdminRoute> 
    }

  ]
},

 


  {
    path: "*",
    element: <Error></Error>,
  },


]);
