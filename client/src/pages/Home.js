import React from "react";
import "./Home.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Ice Cream Shop POS</h1>
        <p>Manage your ice cream parlor efficiently with our intuitive POS system</p>
        <button className="cta-button">Get Started</button>
      </header>

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Real-time Inventory</h3>
            <p>Track stock levels of all your ice cream flavors and toppings seamlessly.</p>
          </div>
          <div className="feature-item">
            <h3>Sales Reports</h3>
            <p>Analyze sales data to understand customer preferences and boost revenue.</p>
          </div>
          <div className="feature-item">
            <h3>Customer Management</h3>
            <p>Keep track of customer orders and reward loyal patrons with discounts.</p>
          </div>
        </div>
      </section>

      <section className="footer-section">
        <p>Ready to serve some smiles? <a href="/signup">Create an Account</a> or <a href="/login">Login</a> to get started!</p>
      </section>
    </div>
  );
}

export default Home;
