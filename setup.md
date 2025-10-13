# Kartavya Setup Guide

## Quick Start

This guide will help you set up the Kartavya civic-tech app on your local machine.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Expo CLI** (for mobile development)
- **Git**

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd kartavya
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# - Set MongoDB connection string
# - Set JWT secret
# - Configure Cloudinary for image uploads (optional)

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g @expo/cli

# Start the Expo development server
npm start
```

### 4. Database Setup

If using local MongoDB:
```bash
# Start MongoDB service
mongod

# The app will automatically create the database and collections
```

For MongoDB Atlas (cloud):
- Create a cluster at https://cloud.mongodb.com
- Get your connection string
- Update the `MONGODB_URI` in your `.env` file

## Environment Configuration

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/kartavya
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:3001

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend
The frontend automatically connects to `http://localhost:3000` in development mode.

## Running the App

### Development Mode

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Open on Device**:
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or press `i` for iOS simulator, `a` for Android emulator

### Production Build

#### Backend Deployment
```bash
cd backend
npm start
```

#### Frontend Build
```bash
cd frontend
expo build:android  # For Android APK
expo build:ios      # For iOS (requires Apple Developer account)
```

## Testing the API

You can test the API endpoints using tools like:
- **Postman**: Import the API collection
- **curl**: Command line testing
- **Thunder Client**: VS Code extension

### Sample API Test
```bash
# Health check
curl http://localhost:3000/health

# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "pincode": "110001",
    "role": "citizen"
  }'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Expo Metro Bundler Issues**:
   ```bash
   # Clear cache
   expo start -c
   
   # Reset Metro cache
   npx react-native start --reset-cache
   ```

3. **Port Already in Use**:
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Or use different port
   PORT=3001 npm run dev
   ```

4. **Image Upload Issues**:
   - Configure Cloudinary credentials
   - Check file size limits
   - Verify network permissions

### Getting Help

- Check the [API Documentation](docs/API_DOCUMENTATION.md)
- Review [Design Specifications](docs/DESIGN_SPECIFICATIONS.md)
- Open an issue on GitHub
- Check console logs for detailed error messages

## Next Steps

1. **Customize the App**:
   - Update colors in `frontend/src/theme/colors.js`
   - Modify app name and icons
   - Add your own branding

2. **Add Features**:
   - Implement push notifications
   - Add real-time updates
   - Integrate with government APIs

3. **Deploy to Production**:
   - Set up cloud hosting (AWS, Heroku, etc.)
   - Configure production database
   - Set up CI/CD pipeline

## Development Tips

- Use React Native Debugger for frontend debugging
- Monitor API requests in browser network tab
- Use MongoDB Compass for database visualization
- Enable hot reloading for faster development

Happy coding! 🚀