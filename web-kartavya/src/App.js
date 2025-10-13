import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Report from './pages/Report';
import Leaderboard from './pages/Leaderboard';
import MyReports from './pages/MyReports';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import IssueDetail from './pages/IssueDetail';
import { isAuthenticated, isAdmin } from './utils/auth';
import './styles/global.css';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Admin Route wrapper
const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (!isAdmin()) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Splash Screen */}
        <Route path="/splash" element={<SplashScreen />} />
        
        {/* Public routes without Layout */}
        <Route path="/welcome" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes with Layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              {isAdmin() ? <AdminDashboard /> : <Home />}
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        } />
        <Route path="/report" element={
          <ProtectedRoute>
            <Layout>
              <Report />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedRoute>
            <Layout>
              <Leaderboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/my-reports" element={
          <ProtectedRoute>
            <Layout>
              <MyReports />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/issue/:id" element={
          <ProtectedRoute>
            <IssueDetail />
          </ProtectedRoute>
        } />

        {/* Redirect root to splash screen on first load */}
        <Route path="*" element={<Navigate to="/splash" />} />
      </Routes>
    </Router>
  );
}

export default App;