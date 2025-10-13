import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, MapPin, UserPlus, Shield, Building, Phone } from 'lucide-react';
import { registerUser, registerAuthority } from '../utils/auth';
import { AUTHORITY_ROLES, getRoleIcon } from '../utils/authorityRoles';

function Register() {
  const [userType, setUserType] = useState('citizen'); // 'citizen' or 'authority'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    area: '',
    pincode: '',
    // Authority-specific fields
    authorityRole: '',
    department: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Validate authority-specific fields
    if (userType === 'authority') {
      if (!formData.authorityRole) {
        setError('Please select your authority role');
        return;
      }
      if (!formData.department) {
        setError('Please enter your department');
        return;
      }
    }

    try {
      if (userType === 'authority') {
        registerAuthority(formData);
        alert('Authority registration successful! Please login.');
      } else {
        registerUser(formData);
        alert('Registration successful! Please login.');
      }
      navigate('/login');
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
            Join Kartavya
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Create an account to start reporting issues
          </p>
        </div>

        {/* User Type Selection */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#000080',
            fontSize: '14px'
          }}>
            Register As
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setUserType('citizen')}
              style={{
                flex: 1,
                padding: '15px',
                border: userType === 'citizen' ? '2px solid #FF9933' : '2px solid #E0E0E0',
                backgroundColor: userType === 'citizen' ? '#FFF9F0' : 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <User size={24} color={userType === 'citizen' ? '#FF9933' : '#666'} />
              <span style={{
                fontWeight: '600',
                color: userType === 'citizen' ? '#FF9933' : '#666',
                fontSize: '14px'
              }}>
                Citizen
              </span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('authority')}
              style={{
                flex: 1,
                padding: '15px',
                border: userType === 'authority' ? '2px solid #000080' : '2px solid #E0E0E0',
                backgroundColor: userType === 'authority' ? '#E8EAF6' : 'white',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Shield size={24} color={userType === 'authority' ? '#000080' : '#666'} />
              <span style={{
                fontWeight: '600',
                color: userType === 'authority' ? '#000080' : '#666',
                fontSize: '14px'
              }}>
                Authority
              </span>
            </button>
          </div>
        </div>

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

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#000080',
              fontSize: '14px'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User
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
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              marginBottom: '8px',
              color: '#000080',
              fontSize: '14px'
            }}>
              City, State
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin
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
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Mumbai, Maharashtra"
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
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px',
            marginBottom: '20px' 
          }}>
            <div>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#000080',
                fontSize: '14px'
              }}>
                Area/Locality
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                placeholder="e.g., Andheri West"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#000080',
                fontSize: '14px'
              }}>
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder="e.g., 400053"
                pattern="[0-9]{6}"
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #E0E0E0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
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
                placeholder="Create a password"
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
              Confirm Password
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
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

          {/* Authority-Specific Fields */}
          {userType === 'authority' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000080',
                  fontSize: '14px'
                }}>
                  Authority Role
                </label>
                <div style={{ position: 'relative' }}>
                  <Shield
                    size={20}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      zIndex: 1
                    }}
                  />
                  <select
                    name="authorityRole"
                    value={formData.authorityRole}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 45px',
                      border: '2px solid #E0E0E0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontFamily: 'Poppins, sans-serif',
                      outline: 'none',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select your authority role</option>
                    {AUTHORITY_ROLES.map(role => (
                      <option key={role} value={role}>
                        {getRoleIcon(role)} {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000080',
                  fontSize: '14px'
                }}>
                  Department
                </label>
                <div style={{ position: 'relative' }}>
                  <Building
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
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Public Works"
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000080',
                  fontSize: '14px'
                }}>
                  Contact Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone
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
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    placeholder="+91 9876543210"
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
            </>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: userType === 'authority' ? '#000080' : '#FF9933',
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
            <UserPlus size={20} />
            Create Account
          </button>

          <div style={{ textAlign: 'center' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Already have an account?{' '}
            </span>
            <Link
              to="/login"
              style={{
                color: '#FF9933',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
