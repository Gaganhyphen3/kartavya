import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      if (isAuthenticated()) {
        navigate('/');
      } else {
        navigate('/welcome');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000080', // Civic Blue
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.1) 35px,
            rgba(255, 255, 255, 0.1) 70px
          )
        `,
        animation: 'slideBackground 20s linear infinite'
      }} />

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        animation: 'fadeInUp 1s ease-out'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '40px',
          animation: 'scaleIn 0.8s ease-out'
        }}>
          <div style={{
            width: '180px',
            height: '180px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <span style={{
              fontSize: '100px',
              animation: 'rotate 3s ease-in-out infinite'
            }}>
              🏛️
            </span>
          </div>
        </div>

        {/* App Name */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '2px',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          animation: 'fadeIn 1.2s ease-out'
        }}>
          Kartavya
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '40px',
          fontWeight: '500',
          letterSpacing: '1px',
          animation: 'fadeIn 1.4s ease-out'
        }}>
          CIVIC-TECH APP
        </p>

        {/* Quote */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 30px'
        }}>
          <p style={{
            fontSize: '20px',
            fontStyle: 'italic',
            color: 'white',
            lineHeight: '1.6',
            fontWeight: '400',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            animation: 'fadeIn 1.6s ease-out'
          }}>
            "A clean, safe city isn't a privilege;<br />
            it's a shared Kartavya."
          </p>
        </div>

        {/* Loading Indicator */}
        <div style={{
          marginTop: '60px',
          animation: 'fadeIn 1.8s ease-out'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto',
            border: '4px solid rgba(255, 255, 255, 0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slideBackground {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(70px);
          }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;
