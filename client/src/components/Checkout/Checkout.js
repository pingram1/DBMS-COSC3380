import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService, authService } from '../../api';
import styles from './Checkout.css';

const Checkout = ({ basketItems, total }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuestCheckout = () => {
    setShowRegistration(true);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      // Register customer and create account
      await customerService.register(formData);
      // Log them in automatically
      const response = await authService.customerLogin(formData.phoneNumber);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'customer');
      
      // Proceed with order
      handlePlaceOrder();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Add order processing logic here
      const orderData = {
        items: basketItems,
        total,
        ...formData
      };
      
      await customerService.placeOrder(orderData);
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Order error:', error);
    }
  };

  if (!isLoggedIn && !showRegistration) {
    return (
      <div className={styles.checkoutContainer}>
        <h2 className={styles.title}>Checkout</h2>
        
        <div className={styles.loginOptions}>
          <div className={styles.option}>
            <h3>Already a customer?</h3>
            <button 
              onClick={() => navigate('/login')}
              className={styles.loginBtn}
            >
              Login
            </button>
          </div>

          <div className={styles.divider}>or</div>

          <div className={styles.option}>
            <h3>New customer?</h3>
            <p>Register now to earn points and get exclusive benefits!</p>
            <button 
              onClick={handleGuestCheckout}
              className={styles.registerBtn}
            >
              Register & Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showRegistration) {
    return (
      <div className={styles.checkoutContainer}>
        <h2 className={styles.title}>Quick Registration</h2>
        
        <form onSubmit={handleRegistration} className={styles.registrationForm}>
          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              placeholder="(123) 456-7890"
              pattern="[0-9]{10}"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your delivery address"
            />
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            {basketItems.map(item => (
              <div key={item.Item_ID} className={styles.summaryItem}>
                <span>{item.quantity}x {item.Item_Name}</span>
                <span>${(item.Unit_Price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Complete Registration & Place Order
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.title}>Checkout</h2>
      
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        {basketItems.map(item => (
          <div key={item.Item_ID} className={styles.summaryItem}>
            <span>{item.quantity}x {item.Item_Name}</span>
            <span>${(item.Unit_Price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className={styles.total}>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={handlePlaceOrder}
        className={styles.placeOrderBtn}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;