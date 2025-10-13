import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Camera, Brain, Users, Trophy } from 'lucide-react';

function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      icon: '🏛️',
      title: 'Welcome to Kartavya',
      description: 'Your civic duty, your voice. Join us in building better communities.',
      color: '#000080',
      showLogo: true
    },
    {
      icon: <Camera size={80} color="#FF9933" />,
      title: 'Report Issues Instantly',
      description: 'Report issues instantly and track every action in real-time.',
      color: '#FF9933',
      showLogo: false
    },
    {
      icon: <Users size={80} color="#138808" />,
      title: 'Connect with Your Community',
      description: 'Connect with your community and see what matters to your neighbors.',
      color: '#138808',
      showLogo: false
    },
    {
      icon: <Trophy size={80} color="#000080" />,
      title: 'Together for a Better Tomorrow',
      description: 'Together for a better tomorrow. Every voice counts, every action matters.',
      color: '#000080',
      showLogo: false
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: '30px',
          right: '30px',
          padding: '10px 24px',
          backgroundColor: 'transparent',
          color: 'white',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif',
          transition: 'all 0.2s',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          e.target.style.borderColor = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        }}
      >
        Skip
      </button>
      <div style={{
        maxWidth: '550px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '50px 40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        {/* Logo/Icon */}
        <div style={{ marginBottom: '25px' }}>
          {slides[currentSlide].showLogo ? (
            <div style={{
              fontSize: '80px',
              marginBottom: '10px',
              animation: 'fadeIn 0.5s ease-in'
            }}>
              {slides[currentSlide].icon}
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease-in' }}>
              {slides[currentSlide].icon}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: slides[currentSlide].showLogo ? '36px' : '28px',
          fontWeight: '700',
          color: slides[currentSlide].color,
          marginBottom: '20px',
          animation: 'fadeIn 0.6s ease-in'
        }}>
          {slides[currentSlide].title}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '18px',
          color: '#666',
          lineHeight: '1.8',
          marginBottom: '40px',
          animation: 'fadeIn 0.8s ease-in',
          maxWidth: '500px'
        }}>
          {slides[currentSlide].description}
        </p>

        {/* Dots Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '30px'
        }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: currentSlide === index ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: currentSlide === index ? slide.color : '#E0E0E0',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleNext}
            style={{
              padding: '14px 32px',
              backgroundColor: slides[currentSlide].color,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'Poppins, sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
