import axios from 'axios';

const BASE_URL = __DEV__ ? 'http://localhost:3001/api' : 'https://your-production-api.com/api';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response.data;
      },
      (error) => {
        console.error('API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.client.post('/auth/register', userData);
  }

  async login(credentials) {
    return this.client.post('/auth/login', credentials);
  }

  async getCurrentUser() {
    return this.client.get('/auth/me');
  }

  // Issue endpoints
  async createIssue(issueData, images = []) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(issueData));
    
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.name || `image_${index}.jpg`,
      });
    });

    return this.client.post('/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getIssuesFeed(params = {}) {
    return this.client.get('/issues/feed', { params });
  }

  async getMyReports(params = {}) {
    return this.client.get('/issues/my-reports', { params });
  }

  async voteOnIssue(issueId, voteType) {
    return this.client.post(`/issues/${issueId}/vote`, { voteType });
  }

  async updateIssueStatus(issueId, status) {
    return this.client.patch(`/issues/${issueId}/status`, { status });
  }

  // User endpoints
  async getUserProfile(userId) {
    const endpoint = userId ? `/users/profile/${userId}` : '/users/profile';
    return this.client.get(endpoint);
  }

  async updateProfile(profileData, profileImage) {
    const formData = new FormData();
    
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type || 'image/jpeg',
        name: profileImage.name || 'profile.jpg',
      });
    }

    return this.client.patch('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getUserStats() {
    return this.client.get('/users/stats');
  }

  async getCommunityUsers(params = {}) {
    return this.client.get('/users/community', { params });
  }

  // Leaderboard endpoints
  async getGlobalLeaderboard(params = {}) {
    return this.client.get('/leaderboard/global', { params });
  }

  async getLocalLeaderboard(params = {}) {
    return this.client.get('/leaderboard/local', { params });
  }

  async getCategoryStats(params = {}) {
    return this.client.get('/leaderboard/categories', { params });
  }

  async getCategoryContributors(category, params = {}) {
    return this.client.get(`/leaderboard/contributors/${category}`, { params });
  }

  async getMonthlyStats(params = {}) {
    return this.client.get('/leaderboard/monthly', { params });
  }

  // Health check
  async healthCheck() {
    return this.client.get('/health');
  }
}

export const apiService = new ApiService();