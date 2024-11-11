import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService } from '../../api';

const Checkout = ({ basketItems, clearBasket, updateBasketQuantity, removeFromBasket }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchCustomerData();
    }
  }, []);

  const fetchCustomerData = async () => {
    try {
      const data = await customerService.getAccount();
      setCustomerData({
        name: `${data.First_Name} ${data.Last_Name}`,
        phoneNumber: data.Phone_Number || '',
        address: data.Address || ''
      });
    } catch (err) {
      console.error('Error fetching customer data:', err);
    }
  };

  const calculateTotal = () => {
    return basketItems.reduce((sum, item) => 
      sum + (item.Unit_Price * item.quantity), 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLoggedIn) {
        // Place order for logged-in customer
        const orderData = {
          items: basketItems.map(item => ({
            Item_ID: item.Item_ID,
            quantity: item.quantity,
            Unit_Price: item.Unit_Price
          })),
          total: calculateTotal()
        };

        await customerService.placeOrder(orderData);
      } else {
        // Place order for guest
        const orderData = {
          items: basketItems.map(item => ({
            Item_ID: item.Item_ID,
            quantity: item.quantity,
            Unit_Price: item.Unit_Price
          })),
          total: calculateTotal(),
          customerInfo: {
            name: customerData.name,
            phoneNumber: customerData.phoneNumber,
            address: customerData.address,
            isGuest: false
          }
        };

        await customerService.placeGuestOrder(orderData);
      }

      clearBasket();
      navigate('/order-confirmation');
    } catch (err) {
      setError(err.message || 'Error placing order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!basketItems?.length) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Your basket is empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="border rounded p-4 mb-4">
        <h3 className="font-bold mb-2">Delivery Information</h3>
        <p>Name: {customerData.name}</p>
        <p>Phone: {customerData.phoneNumber}</p>
        <p>Address: {customerData.address}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border rounded p-4 mt-4">
          <h3 className="font-bold mb-2">Order Summary</h3>
          {basketItems.map(item => (
            <div key={item.Item_ID} className="flex justify-between py-2">
              <span>{item.quantity}x {item.Item_Name}</span>
              <span>${(item.Unit_Price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;