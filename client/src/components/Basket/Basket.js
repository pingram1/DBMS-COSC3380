import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from './ItemCard';
import { calculateTotal } from './utils';

const Basket = ({ items, updateQuantity, removeItem }) => {
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  if (!items?.length) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Your basket is empty</h2>
        <p className="mb-4">Add some delicious ice cream to get started!</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Basket</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <ItemCard
            key={item.Item_ID}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl">${calculateTotal(items)}</span>
        </div>

        <button
          onClick={handleCheckoutClick}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Basket;