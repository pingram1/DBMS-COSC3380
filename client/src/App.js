import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initialize } from './utils/reactGA';
import FourOFour from './components/404/FourOFour'
import ProtectedRoute from './components/ProtectedRoute';


const NavBar = lazy(() => import('./components/Navbar/Navbar'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const About = lazy(() => import('./pages/About/About'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard/CustomerDashboard'));
const InventoryManagement = lazy(() => import('./pages/EmployeeDashboard/InventoryManagement/InventoryManagement'));

function App() {
  initialize();

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
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          
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