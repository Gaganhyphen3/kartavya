import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, User, Shield } from 'lucide-react';
import { loginUser } from '../utils/auth';
import { AUTHORITY_ROLES, getRoleIcon } from '../utils/authorityRoles';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // 'user' or 'admin'
  });
  const [authorityRole, setAuthorityRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate authority role if logging in as authority
    if (formData.role === 'admin' && !authorityRole) {
      setError('Please select your authority role');
      return;
    }
    
    try {
      loginUser(formData.email, formData.password, formData.role, authorityRole);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '450px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        {/* Logo/Title */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '80px', marginBottom: '10px' }}>
            🏛️
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#000080',
            marginBottom: '10px'
          }}>
            Kartavya
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Welcome back! Sign in to continue
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#000080',
            fontSize: '14px'
          }}>
            Login As
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('user')}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: formData.role === 'user' ? '#FF9933' : 'white',
                color: formData.role === 'user' ? 'white' : '#666',
                border: `2px solid ${formData.role === 'user' ? '#FF9933' : '#E0E0E0'}`,
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.2s'
              }}
            >
              <User size={20} />
              User
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: formData.role === 'admin' ? '#000080' : 'white',
                color: formData.role === 'admin' ? 'white' : '#666',
                border: `2px solid ${formData.role === 'admin' ? '#000080' : '#E0E0E0'}`,
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'Poppins, sans-serif',
                transition: 'all 0.2s'
              }}
            >
              <Shield size={20} />
              Authority
            </button>
          </div>
        </div>

        {/* Authority Role Dropdown */}
        {formData.role === 'admin' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#000080',
              fontSize: '14px'
            }}>
              Authority Role *
            </label>
            <select
              value={authorityRole}
              onChange={(e) => setAuthorityRole(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #E0E0E0',
                borderRadius: '12px',
                fontSize: '16px',
                fontFamily: 'Poppins, sans-serif',
                outline: 'none',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Select your role...</option>
              {AUTHORITY_ROLES.map(role => (
                <option key={role} value={role}>
                  {getRoleIcon(role)} {role}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#FFEBEE',
            color: '#D32F2F',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#000080',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999'
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  border: '2px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#000080',
              fontSize: '14px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999'
                }}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 45px',
                  border: '2px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer'
            }}>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" style={{
              fontSize: '14px',
              color: '#FF9933',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#FF9933',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '20px'
            }}
          >
            <LogIn size={20} />
            Sign In
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Don't have an account?{' '}
            </span>
            <Link
              to="/register"
              style={{
                color: '#FF9933',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
