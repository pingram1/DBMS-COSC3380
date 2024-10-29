import { useState, useEffect } from 'react';
import { customerAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true); // set loading to display while api getting the data
   
        const response = await customerAPI.getAccount();
        
        if (response?.data) {
          setCustomerData(response.data);
        } else {
          setError('No data received from server');
        }
      } catch (err) {
        console.error('Error fetching customer data:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        if (err.response?.status === 401) {
          console.log('Unauthorized - redirecting to login');
          navigate('/login');
        } else {
          setError(err.response?.data?.error || 'Failed to load customer data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome Back!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <p><span className="font-medium">Phone:</span> {customerData?.Phone_Number}</p>
            <p><span className="font-medium">Member Level:</span> {customerData?.Membership_Level}</p>
            <p><span className="font-medium">Total Points Earned:</span> {customerData?.Total_Accrued_Discount_Points}</p>
            <p><span className="font-medium">Points Used:</span> {customerData?.Discount_Points_Used}</p>
            <p><span className="font-medium">Points Available:</span> {
              (customerData?.Total_Accrued_Discount_Points || 0) - (customerData?.Discount_Points_Used || 0)
            }</p>
            <p><span className="font-medium">Member Since:</span> {
              customerData?.Account_Creation_Date && 
              new Date(customerData.Account_Creation_Date).toLocaleDateString()
            }</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CustomerDashboard;