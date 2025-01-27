import React from 'react';
// import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';

const UseItems = () => {

    // const axiosPublic = UseAxiosPublic();
    const axiosSecure = UseAxiosSecure();


    const {data: book = [], isPending: loading, refetch} = useQuery({
        queryKey: ['book'], 
        queryFn: async() =>{
            const res = await axiosSecure.get('/book');
            return res.data;
        }
    })

    return [book, loading, refetch]
};

export default UseItems;