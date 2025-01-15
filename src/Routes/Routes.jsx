import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Error from '../Pages/Shared/Error/Error';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
  },







  {
    path: "*",
    element: <Error></Error>,
  },


]);
