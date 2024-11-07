import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Guest Navigation (Not Logged In)
  if (!userRole) {
    return (
      <nav>
        <div>
          <Link to="/">Ice Cream Shop</Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>
    );
  }

  // Customer Navigation
  if (userRole === 'customer') {
    return (
      <nav>
        <div>
          <Link to="/">Ice Cream Shop</Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/customer/dashboard">My Account</Link>
            {/* Add cart link if you have shopping cart feature */}
            {/* <Link to="/cart">Cart</Link> */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    );
  }

  // Admin Navigation
  if (userRole === 'admin') {
    return (
      <nav>
        <div>
          <Link to="/">Ice Cream Shop</Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/admin/dashboard">Manage Products</Link>
            <Link to="/employeeM">Vendors</Link>
            <Link to="/reports">Reports</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    );
  }

  // Employee Navigation
  if (userRole === 'employee') {
    return (
      <nav>
        <div>
          <Link to="/">Ice Cream Shop</Link>

          <div>
            <Link to="/">Home</Link>
            <Link to="/employee/dashboard">Manage Products</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;