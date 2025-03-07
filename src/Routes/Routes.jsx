import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Error from '../Pages/Shared/Error/Error';
import Home from '../Pages/Home/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AdminRoute from './AdminRoute';
import BookAParcel from '../Pages/Dashboard/BookAParcel/BookAParcel';
import MyParcels from '../Pages/Dashboard/MyParcels/MyParcels';
import UpdateItems from '../Pages/Dashboard/UpdateItems/UpdateItems';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';
import AllParcels from '../Pages/Dashboard/AllParcels/AllParcels';
import MyDeliveryList from '../Pages/Dashboard/MyDeliveryList/MyDeliveryList';
import MyReviews from '../Pages/Dashboard/MyReviews/MyReviews';
import AllDeliveryMan from '../Pages/Dashboard/AllDeliveryMan/AllDeliveryMan';
import AdminStatistics from '../Pages/Dashboard/Statistics/AdminStatistics';
import Payment from '../Pages/Dashboard/Payment/Payment';
import DeliverymanRoute from './DeliverymanRoute';

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
      element: <PrivateRoute> <BookAParcel></BookAParcel></PrivateRoute> 
    },


    {
      path: 'myparcels',
      element:<PrivateRoute> <MyParcels></MyParcels> </PrivateRoute> 
    },

    {
      path: 'updateItem/:id',
      element: <PrivateRoute> <UpdateItems></UpdateItems> </PrivateRoute> ,
      loader: ({params}) => fetch(`https://grandgateway.vercel.app/book/${params.id}`)
    },

    {
      path: 'payment/:id',
      element: <PrivateRoute> <Payment></Payment> </PrivateRoute> ,
      loader: ({params}) => fetch(`https://grandgateway.vercel.app/book/${params.id}`)
    },

    
    {
      path: 'myprofile',
      element: <PrivateRoute> <MyProfile></MyProfile> </PrivateRoute> 
    },



    // deliveryman

    {
      path: 'myDeliveryList',
      element: <PrivateRoute> <DeliverymanRoute> <MyDeliveryList></MyDeliveryList></DeliverymanRoute>  </PrivateRoute> 
    },

    {
      path: 'myReview',
      element: <PrivateRoute> <DeliverymanRoute> <MyReviews></MyReviews> </DeliverymanRoute> </PrivateRoute> 
    },


    



    // admin only routes
    
    {
      path: 'allUsers',
      element: <PrivateRoute> <AdminRoute> <AllUsers></AllUsers> </AdminRoute>  </PrivateRoute> 
    },


     
    {
      path: 'allParcels',
      element: <PrivateRoute> <AdminRoute> <AllParcels></AllParcels> </AdminRoute> </PrivateRoute> 
    },

    {
      path: 'allDeliveryman',
      element: <PrivateRoute> <AdminRoute> <AllDeliveryMan></AllDeliveryMan> </AdminRoute>  </PrivateRoute> 
    },
    
    {
      path: 'statistics',
      element: <PrivateRoute> <AdminRoute> <AdminStatistics></AdminStatistics> </AdminRoute>  </PrivateRoute> 
    }





    

  ]
},

 


  {
    path: "*",
    element: <Error></Error>,
  },


]);
