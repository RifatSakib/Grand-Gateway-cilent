import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseDeliveryman = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();


 const { data: isDeliveryman, isPending: isDeliverymanLoading } = useQuery({
    queryKey: ['isDeliveryman2', user?.email],  // Added user.email to query key
    enabled: !!user?.email && !loading,  // Ensure the query runs only when email is available
    queryFn: async () => {
        console.log('checking isDeliveryman', user.email);
        const res = await axiosSecure.get(`/users/deliverymanrelod/${user.email}`);
        console.log(res.data);
        return res.data?.deliveryman;
    }
});



    return [isDeliveryman, isDeliverymanLoading]
};

export default UseDeliveryman;