import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService, authService } from '../../api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Register the customer
      await customerService.register(formData);
      
      // After successful registration, attempt to login
      const loginResponse = await authService.customerLogin(formData.phoneNumber);
      
      if (loginResponse?.data?.token) {
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('userRole', 'customer');
        navigate('/customer/dashboard');
      } else {
        // If login response doesn't have expected data
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration/Login error:', err);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            pattern="[0-9]{10}"
            placeholder="1234567890"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Enter your address"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>

        <div>
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate('/login')}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;