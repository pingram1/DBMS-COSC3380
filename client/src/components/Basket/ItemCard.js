import React from 'react';
import QuantityControl from './QuantityControl';

const ItemCard = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src="/api/placeholder/80/80"
          alt={item.Item_Name}
          className="w-20 h-20 object-cover rounded"
        />

        <div>
          <h3 className="font-semibold">{item.Item_Name}</h3>
          <p className="text-gray-600">${item.Unit_Price}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <QuantityControl
          quantity={item.quantity}
          onDecrement={() => updateQuantity(item.Item_ID, item.quantity - 1)}
          onIncrement={() => updateQuantity(item.Item_ID, item.quantity + 1)}
          disabled={item.quantity <= 1}
        />

        <div className="w-24 text-right">
          ${(item.Unit_Price * item.quantity)}
        </div>

        <button
          onClick={() => removeItem(item.Item_ID)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ItemCard;