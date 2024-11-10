import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initialize } from './utils/reactGA';
import FourOFour from './components/404/FourOFour'
import ProtectedRoute from './components/ProtectedRoute';

const NavBar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const About = lazy(() => import('./pages/About/About'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard/CustomerDashboard'));
const InventoryManagement = lazy(() => import('./pages/EmployeeDashboard/InventoryManagement/InventoryManagement'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const OrderConfirmation = lazy(() => import('./components/Checkout/OrderConfirmation'));
const SaleReports = lazy(() => import('./pages/AdminDashboard/SaleReports/SaleReports'))

function App() {
  initialize();

  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (item) => {
    setBasketItems((prev) => {
      const existing = prev.find((i) => i.Item_ID === item.Item_ID);
      if (existing) {
        return prev.map((i) =>
          i.Item_ID === item.Item_ID ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateBasketQuantity = (itemId, quantity) => {
    setBasketItems((prev) =>
      prev.map((item) =>
        item.Item_ID === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromBasket = (itemId) => {
    setBasketItems((prev) => prev.filter((item) => item.Item_ID !== itemId));
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <NavBar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<FourOFour />} />
            <Route
              path="/shop"
              element={
                <Shop
                  basketItems={basketItems}
                  addToBasket={addToBasket}
                  updateBasketQuantity={updateBasketQuantity}
                  removeFromBasket={removeFromBasket}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

             {/* Checkout Routes */}
             <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRole="customer">
                  <Checkout
                    basketItems={basketItems}
                    clearBasket={clearBasket}
                    updateBasketQuantity={updateBasketQuantity}
                    removeFromBasket={removeFromBasket}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
            />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute allowedRole="employee">
                  <InventoryManagement />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <InventoryManagement />
                  <SaleReports />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;