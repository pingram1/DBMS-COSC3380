import { useState, useEffect } from 'react';
import { customerService } from '../../api';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const data = await customerService.getAccount();
        if (data) {
          setCustomerData(data);
        } else {
          setError('No data received from server');
        }
      } catch (err) {
        console.error('Error fetching customer data:', err);
        if (err.status === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to load customer data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [navigate]);

  const getMembershipStyle = (level) => {
    const levelLower = level?.toLowerCase();
    return `${styles.membershipBadge} ${styles[levelLower]}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMessage}>{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridLayout}>
        {/* Membership Status Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Membership Status</h2>
            <span className={getMembershipStyle(customerData.Membership_Level)}>
              {customerData.Membership_Level}
            </span>
          </div>

          <div className={styles.pointsSection}>
            <div>
              <h3 className={styles.sectionTitle}>Points Balance</h3>
              <div className={styles.pointsBalance}>
                {customerData.Available_Points}
              </div>
              {customerData.Points_To_Next_Level > 0 && (
                <p className={styles.pointsToNext}>
                  {customerData.Points_To_Next_Level} points until next level
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {customerData.Points_To_Next_Level > 0 && (
              <div className={styles.progressBar}>
                <div 
                  className={`${styles.progressFill} ${getMembershipStyle(customerData.Membership_Level)}`}
                  style={{
                    width: `${(customerData.Available_Points / (customerData.Available_Points + customerData.Points_To_Next_Level)) * 100}%`
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Card */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Your Benefits</h2>
          <ul className={styles.benefitsList}>
            {customerData.currentBenefits.benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <span className={styles.benefitCheck}>✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          {customerData.nextLevelBenefits && (
            <div className={styles.nextLevelSection}>
              <h3 className={styles.nextLevelTitle}>
                Next Level: {customerData.nextLevel}
              </h3>
              <ul className={styles.nextLevelBenefits}>
                {customerData.nextLevelBenefits.benefits.map((benefit, index) => (
                  <li key={index} className={styles.nextLevelItem}>
                    <span className={styles.nextLevelCircle}>○</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Account Information Card */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Account Information</h2>
          <div className={styles.accountInfo}>
            <p><span className={styles.accountLabel}>Phone:</span> {customerData?.Phone_Number}</p>
            <p>
              <span className={styles.accountLabel}>Member Since:</span> {
                customerData?.Account_Creation_Date && 
                new Date(customerData.Account_Creation_Date).toLocaleDateString()
              }
            </p>
            <p><span className={styles.accountLabel}>Total Points Earned:</span> {customerData?.Total_Accrued_Discount_Points}</p>
            <p><span className={styles.accountLabel}>Points Used:</span> {customerData?.Discount_Points_Used}</p>
            <p><span className={styles.accountLabel}>Current Point Rate:</span> {customerData?.currentBenefits.pointsRate}x</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;