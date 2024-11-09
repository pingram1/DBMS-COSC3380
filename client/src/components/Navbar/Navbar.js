import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../Navbar/Navbar.css';

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
            {/* Add cart link if you have shopping cart feature */}
            {/* <Link to="/cart">Cart</Link> */}
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
        <nav>
          <NavLink to="/" className="nav-logo">Ice Cream Shop</NavLink>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/admin/dashboard">Manage Products</Link>
            <Link to="/employeeM">Vendors</Link>
            <Link to="/reports">Reports</Link>
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
          <Link to="/">Ice Cream Shop</Link>
          <div className="nav-items">
            <Link to="/">Home</Link>
            <Link to="/employee/dashboard">Manage Products</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </header>
    );
  }
};

export default Navbar;