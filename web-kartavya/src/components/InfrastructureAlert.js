import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Navigation } from 'lucide-react';
import { findNearbyInfrastructure, getClosestCritical, generateAlertMessage } from '../utils/nearbyInfrastructure';

const InfrastructureAlert = ({ report }) => {
  const [infrastructure, setInfrastructure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (report.geoTag && report.geoTag.latitude && report.geoTag.longitude) {
      detectNearbyInfrastructure();
    }
  }, [report.id]);

  const detectNearbyInfrastructure = async () => {
    setLoading(true);
    try {
      const result = await findNearbyInfrastructure(
        report.geoTag.latitude,
        report.geoTag.longitude
      );
      
      if (result.found) {
        setInfrastructure(result.infrastructure);
      }
    } catch (error) {
      console.error('Failed to detect infrastructure:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: '12px',
        backgroundColor: '#FFF9E6',
        borderLeft: '4px solid #FFB300',
        borderRadius: '8px',
        marginBottom: '12px',
        fontSize: '13px',
        color: '#666'
      }}>
        🔍 Checking for nearby critical infrastructure...
      </div>
    );
  }

  if (!infrastructure || infrastructure.length === 0) {
    return null;
  }

  const critical = infrastructure.filter(i => 
    i.type === 'health' || i.type === 'education'
  );

  if (critical.length === 0) {
    return null;
  }

  const closest = getClosestCritical(infrastructure);
  const alertMessage = generateAlertMessage(infrastructure);

  return (
    <div style={{
      marginBottom: '12px'
    }}>
      {/* Main Alert */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#FFEBEE',
        borderLeft: '4px solid #D32F2F',
        borderRadius: '8px',
        marginBottom: '8px',
        cursor: 'pointer'
      }}
      onClick={() => setShowDetails(!showDetails)}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertTriangle size={20} color="#D32F2F" />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#D32F2F',
              marginBottom: '4px'
            }}>
              Priority Alert
            </div>
            <div style={{
              fontSize: '13px',
              color: '#666'
            }}>
              {alertMessage}
            </div>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#999'
          }}>
            {showDetails ? '▼' : '▶'}
          </div>
        </div>
      </div>

      {/* Details Panel */}
      {showDetails && (
        <div style={{
          padding: '12px',
          backgroundColor: '#F5F5F5',
          borderRadius: '8px',
          fontSize: '13px'
        }}>
          <div style={{
            fontWeight: '600',
            marginBottom: '10px',
            color: '#333'
          }}>
            Nearby Critical Infrastructure ({critical.length})
          </div>

          {critical.slice(0, 5).map((facility, index) => (
            <div
              key={facility.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '6px',
                marginBottom: '6px',
                border: index === 0 ? '2px solid #FF9933' : '1px solid #E0E0E0'
              }}
            >
              <span style={{ fontSize: '20px' }}>{facility.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '2px'
                }}>
                  {facility.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {facility.typeLabel} • {facility.distanceFormatted} away
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${report.geoTag.latitude},${report.geoTag.longitude}&destination=${facility.coordinates.lat},${facility.coordinates.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 10px',
                  backgroundColor: '#E3F2FD',
                  color: '#1976D2',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Navigation size={12} />
                Directions
              </a>
            </div>
          ))}

          {critical.length > 5 && (
            <div style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '12px',
              marginTop: '8px'
            }}>
              + {critical.length - 5} more facilities nearby
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfrastructureAlert;
