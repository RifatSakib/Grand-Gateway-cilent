import React, { useContext } from 'react';
// import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
// import { AuthContext } from '../Providers/AuthProvider';
import UseAuth from './UseAuth';

const UseItems = () => {

    // const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();
    const { user} = UseAuth();


    const { data: book = [], isPending: loading, refetch } = useQuery({
        queryKey: ['book', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/book?email=${user.email}`);
            return res.data;
        }
    })

    return [book, loading, refetch]
};

export default UseItems;