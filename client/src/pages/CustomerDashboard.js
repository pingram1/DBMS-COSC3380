import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerAccount = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/acc/customer/account', {
          headers: { Authorization: `Bearer ${token}` }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!customerData) return <div>No account data found</div>;

  return (
    <div>
      <h1>My Account</h1>
      <div>
        <h2>Account Information</h2>
        <p>Membership Level: {customerData.Membership_Level}</p>
        <p>Phone Number: {customerData.Phone_Number}</p>
        <p>Address: {customerData.Address}</p>
        <p>Member Since: {new Date(customerData.Account_Creation_Date).toLocaleDateString()}</p>
      </div>

      <div>
        <h2>Rewards Points</h2>
        <p>Current Points: {customerData.Current_Discount_Points}</p>
        <p>Total Points Earned: {customerData.Total_Accrued_Discount_Points}</p>
        <p>Points Used: {customerData.Discount_Points_Used}</p>
      </div>
    </div>
  );
};

export default CustomerAccount;