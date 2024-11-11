import React from 'react';

const QuantityControl = ({ quantity, onDecrement, onIncrement, disabled }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        disabled={disabled}
        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;