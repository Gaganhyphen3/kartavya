import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Camera, Trophy, FileText, User, LogOut } from 'lucide-react';
import { logoutUser } from '../utils/auth';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/report', icon: Camera, label: 'Report' },
    { path: '/leaderboard', icon: Trophy, label: 'Rankings' },
    { path: '/my-reports', icon: FileText, label: 'My Reports' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo-link">
              <div className="logo">
                <span className="logo-icon">🏛️</span>
                <span className="logo-text">Kartavya</span>
              </div>
            </Link>
            <div className="tagline">Civic-Tech Community Platform</div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Navigation */}
      <nav className="bottom-nav">
        <div className="nav-container">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: linear-gradient(135deg, var(--civic-blue) 0%, var(--emerald-green) 100%);
          color: var(--text-light);
          padding: var(--spacing-lg) 0;
          box-shadow: var(--shadow-md);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .tagline {
          font-size: 1rem;
          opacity: 0.9;
          font-weight: 400;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Poppins', sans-serif;
        }

        .logout-btn:hover {
          background-color: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .main-content {
          flex: 1;
          padding-bottom: 80px; /* Space for bottom nav */
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--white);
          border-top: 1px solid #e0e0e0;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .nav-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: var(--spacing-sm) 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          text-decoration: none;
          color: var(--urban-gray);
          transition: all 0.2s ease;
          border-radius: var(--radius-sm);
          min-width: 60px;
        }

        .nav-item:hover {
          color: var(--civic-blue);
          background-color: rgba(0, 119, 182, 0.1);
        }

        .nav-item.active {
          color: var(--civic-blue);
          background-color: rgba(0, 119, 182, 0.1);
        }

        .nav-label {
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .logo-image {
            height: 40px;
          }

          .tagline {
            font-size: 0.9rem;
          }

          .nav-label {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;