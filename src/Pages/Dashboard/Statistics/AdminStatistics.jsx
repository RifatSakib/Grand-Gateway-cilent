import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Chart from 'react-apexcharts';

const AdminStatistics = () => {

    const axiosSecure = UseAxiosSecure();
    const [chartData, setChartData] = useState({});
    const [lineChartData, setLineChartData] = useState({});


    const { data: bookings = [], isLoading, error } = useQuery({
        queryKey: ['bookings-by-date'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/bookings-by-date');
            return res.data;
        }
    });



    // Fetch bookings and deliveries for line chart
    const { data: bookingsAndDeliveries = [], isLoading: loadingDeliveries, error: errorDeliveries } = useQuery({
        queryKey: ['bookings-and-deliveries-by-date'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/bookings-and-deliveries-by-date');
            return res.data;
        }
    });


    useEffect(() => {
        if (bookings.length > 0) {
            const dates = bookings.map(booking => booking._id);
            const totals = bookings.map(booking => booking.totalBookings);

            setChartData({
                options: {
                    chart: {
                        id: 'bookings-chart'
                    },
                    xaxis: {
                        categories: dates, // Set the x-axis categories to the booking dates
                    },
                    title: {
                        text: 'Bookings by Date',
                        align: 'center'
                    }
                },
                series: [{
                    name: 'Total Bookings',
                    data: totals // Set the data for the series
                }]
            });
        }
    }, [bookings]);



    // Prepare line chart data
    useEffect(() => {
        if (bookingsAndDeliveries.length > 0) {
            const dates = bookingsAndDeliveries.map(booking => booking._id);
            const totalBookings = bookingsAndDeliveries.map(booking => booking.totalBookings);
            const totalDelivered = bookingsAndDeliveries.map(booking => booking.totalDelivered);

            setLineChartData({
                options: {
                    chart: {
                        id: 'deliveries-chart'
                    },
                    xaxis: {
                        categories: dates,
                    },
                    title: {
                        text: 'Bookings vs Deliveries by Date',
                        align: 'center'
                    }
                },
                series: [
                    {
                        name: 'Total Bookings',
                        data: totalBookings
                    },
                    {
                        name: 'Total Delivered',
                        data: totalDelivered
                    }
                ]
            });
        }
    }, [bookingsAndDeliveries]);



    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error('Error fetching bookings data:', error);
        return <div>Error fetching bookings data</div>;
    }

    return (
        <div>
            {chartData.series ? (
                <Chart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            ) : (
                <div>Loading...</div>
            )}


            {lineChartData.series ? (
                <Chart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    height={350}
                />
            ) : (
                <div>Loading...</div>
            )}



        </div>
    );
};

export default AdminStatistics;