import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
const Payment = () => {
    return (
        <div className='w-full'>
            <Elements stripe={stripePromise} >
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Payment;