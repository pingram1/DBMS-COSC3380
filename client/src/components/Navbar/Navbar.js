import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

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
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="nav-logo">insert logo</NavLink>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </nav>
      </header>
    );
  }

  // Customer Navigation
  if (userRole === 'customer') {
    return (
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="nav-logo">Ice Cream Shop</NavLink>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/customer/dashboard">My Account</Link>
            <Link to="/cart">Cart</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </header>
    );
  }

  // Admin Navigation
  if (userRole === 'admin') {
    return (
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="nav-logo">Ice Cream Shop</NavLink>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/admin/dashboard">Inventory</Link>
            <div className="dropdown">
              <span className="nav-link">Reports</span>
              <div className="dropdown-content">
                <Link to="/admin/reports/sales">Sales Report</Link>
                <Link to="/admin/reports/inventory">Inventory Report</Link>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </header>
    );
  }

  // Employee Navigation
  if (userRole === 'employee') {
    return (
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" className="nav-logo">Ice Cream Shop</NavLink>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/employee/dashboard">Inventory</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </header>
    );
  }
};

export default Navbar;