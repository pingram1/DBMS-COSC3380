import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Basket.css';

const Basket = ({ items, updateQuantity, removeItem, total }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!items.length) {
    return (
      <div className={styles.emptyBasket}>
        <h2>Your basket is empty</h2>
        <p>Add some delicious ice cream to get started!</p>
        <button 
          onClick={() => navigate('/shop')}
          className={styles.continueShoppingBtn}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.basketContainer}>
      <h2 className={styles.title}>Your Basket</h2>
      
      <div className={styles.itemList}>
        {items.map((item) => (
          <div key={item.Item_ID} className={styles.basketItem}>
            <div className={styles.itemImage}>
              <img src="/api/placeholder/80/80" alt={item.Item_Name} />
            </div>
            
            <div className={styles.itemDetails}>
              <h3>{item.Item_Name}</h3>
              <p className={styles.price}>${item.Unit_Price.toFixed(2)}</p>
            </div>

            <div className={styles.quantityControls}>
              <button 
                onClick={() => updateQuantity(item.Item_ID, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.Item_ID, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className={styles.itemTotal}>
              ${(item.Unit_Price * item.quantity).toFixed(2)}
            </div>

            <button 
              onClick={() => removeItem(item.Item_ID)}
              className={styles.removeBtn}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.basketSummary}>
        <div className={styles.subtotal}>
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button 
          onClick={handleCheckout}
          className={styles.checkoutBtn}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Basket;