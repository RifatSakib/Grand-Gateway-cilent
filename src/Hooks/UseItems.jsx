import React from 'react';
import UseAxiosPublic from './UseAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const UseItems = () => {

    const axiosPublic = UseAxiosPublic();


    const {data: book = [], isPending: loading, refetch} = useQuery({
        queryKey: ['book'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/book');
            return res.data;
        }
    })

    return [book, loading, refetch]
};

export default UseItems;