import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import UseDeliveryman from '../Hooks/UseDeliveryman';


const DeliverymanRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isDeliveryman,isDeliverymanLoading] = UseDeliveryman();
    console.log(isDeliveryman);
    const location = useLocation();

    if (loading || isDeliverymanLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isDeliveryman) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default DeliverymanRoute;