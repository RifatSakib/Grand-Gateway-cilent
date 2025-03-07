import React from 'react';
import UseAuth from './UseAuth';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseDeliveryman = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: isDeliveryman, isPending: isDeliverymanLoading } = useQuery({
        queryKey: [user?.email, 'isDeliveryman'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is Deliveryman', user)
            const res = await axiosSecure.get(`/users/deliveryman/${user.email}`);
            console.log(res.data);
            return res.data?.deliveryman;
        }
    })
    return [isDeliveryman, isDeliverymanLoading]
};

export default UseDeliveryman;