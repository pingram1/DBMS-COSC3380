import { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerAccount.css';

const CustomerAccount = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/acc/customer/account', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomerData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error loading account data');
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!customerData) return <div className="no-data">No account data found</div>;

  // Calculate rewards points progress (Assuming 1000 points are required for the next reward)
  const pointsForNextReward = 1000;
  const pointsProgress =
    (customerData.Current_Discount_Points / pointsForNextReward) * 100;

  return (
    <div className="customer-account-container">
      <h1 className="title">My Account</h1>
      <div className="account-info-card">
        <h2>Account Information</h2>
        <p><strong>Membership Level:</strong> {customerData.Membership_Level}</p>
        <p><strong>Phone Number:</strong> {customerData.Phone_Number}</p>
        <p><strong>Address:</strong> {customerData.Address}</p>
        <p><strong>Member Since:</strong> {new Date(customerData.Account_Creation_Date).toLocaleDateString()}</p>
      </div>

      <div className="rewards-card">
        <h2>Rewards Points</h2>
        <p><strong>Current Points:</strong> {customerData.Current_Discount_Points}</p>
        <p><strong>Total Points Earned:</strong> {customerData.Total_Accrued_Discount_Points}</p>
        <p><strong>Points Used:</strong> {customerData.Discount_Points_Used}</p>

        <div className="points-progress-bar">
          <div
            className="points-progress"
            style={{ width: `${pointsProgress}%` }}
          ></div>
        </div>
        <p className="progress-label">{`${pointsProgress.toFixed(1)}% towards next reward`}</p>
      </div>
    </div>
  );
};

export default CustomerAccount;
