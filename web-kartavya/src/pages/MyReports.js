import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Image as ImageIcon, MapPin } from 'lucide-react';
import { getReportsByUser } from '../utils/reports';
import { getCurrentUser } from '../utils/auth';

function MyReports() {
  const currentUser = getCurrentUser();
  const myReports = currentUser ? getReportsByUser(currentUser.id) : [];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={20} color="#138808" />;
      case 'in-progress':
        return <Clock size={20} color="#FF9933" />;
      case 'pending':
        return <AlertCircle size={20} color="#FFA500" />;
      case 'rejected':
        return <XCircle size={20} color="#D32F2F" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return '#138808';
      case 'in-progress':
        return '#FF9933';
      case 'pending':
        return '#FFA500';
      case 'rejected':
        return '#D32F2F';
      default:
        return '#666';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'resolved':
        return '#E8F5E9';
      case 'in-progress':
        return '#FFF3E0';
      case 'pending':
        return '#FFF8E1';
      case 'rejected':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: '700', 
        color: '#000080',
        marginBottom: '10px'
      }}>
        My Reports
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Track the status of your submitted issues
      </p>

      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {myReports.map((report) => (
          <div
            key={report.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '2px solid #F0F0F0'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              {/* Image Thumbnail */}
              {report.image && (
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginRight: '15px',
                  flexShrink: 0
                }}>
                  <img 
                    src={report.image} 
                    alt={report.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#000080',
                  marginBottom: '8px'
                }}>
                  {report.title}
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '8px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#F0F0F0',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    {report.category}
                  </div>
                  {report.severity && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 12px',
                      backgroundColor: report.severity === 'high' ? '#FFEBEE' : 
                                     report.severity === 'medium' ? '#FFF3E0' : '#E8F5E9',
                      color: report.severity === 'high' ? '#D32F2F' : 
                             report.severity === 'medium' ? '#FF9933' : '#138808',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      <AlertCircle size={12} />
                      {report.severity}
                    </div>
                  )}
                  {report.accuracy > 0 && (
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: '#E3F2FD',
                      color: '#1976D2',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      AI: {report.accuracy}%
                    </div>
                  )}
                </div>
                {report.aiAnalysis && (
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: '1.4',
                    marginTop: '5px'
                  }}>
                    {report.aiAnalysis}
                  </p>
                )}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: getStatusBg(report.status),
                borderRadius: '20px'
              }}>
                {getStatusIcon(report.status)}
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: getStatusColor(report.status),
                  textTransform: 'capitalize'
                }}>
                  {report.status.replace('-', ' ')}
                </span>
              </div>
            </div>

            <div style={{
              paddingTop: '15px',
              borderTop: '1px solid #F0F0F0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: report.geoTag ? '10px' : '0'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  Reported on {new Date(report.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#FF9933'
                }}>
                  ↑ {report.upvotes} upvotes
                </span>
              </div>
              
              {/* GeoTag Info */}
              {report.geoTag && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#1976D2'
                }}>
                  <MapPin size={14} />
                  <span>{report.geoTag.coordinates}</span>
                  <a
                    href={report.geoTag.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976D2',
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    View on Map →
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {myReports.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            You haven't reported any issues yet.
          </p>
          <button style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#FF9933',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Report Your First Issue
          </button>
        </div>
      )}
    </div>
  );
}

export default MyReports;
