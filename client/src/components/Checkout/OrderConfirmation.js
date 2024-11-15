import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
      <p className="mb-4">Your order has been successfully placed.</p>
      <button
        onClick={() => navigate('/shop')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;