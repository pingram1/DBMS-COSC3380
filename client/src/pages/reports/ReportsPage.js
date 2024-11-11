import React from 'react';
import { Link } from 'react-router-dom';

const ReportsOptionsPage = () => {
  return (
    <div>
      <h1>Reports</h1>
      <div>
        <Link to="/reports/flavor-monthly-sales">
          <button>Flavor Monthly Sales</button>
        </Link>
        <Link to="/reports/topping-monthly-sales">
          <button>Toppings Monthly Sales</button>
        </Link>
        <Link to="/reports/item-aggregate">
          <button>Aggregate Sales Report</button>
        </Link>
      </div>
    </div>
  );
};

export default ReportsOptionsPage;
