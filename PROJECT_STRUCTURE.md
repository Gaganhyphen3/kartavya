# Kartavya Project Structure

```
kartavya/
├── README.md                          # Main project documentation
├── setup.md                          # Setup and installation guide
├── install.sh                        # Unix/Linux installation script
├── install.bat                       # Windows installation script
├── PROJECT_STRUCTURE.md              # This file
│
├── backend/                          # Node.js API Server
│   ├── package.json                  # Backend dependencies
│   ├── server.js                     # Main server file
│   ├── .env.example                  # Environment variables template
│   │
│   ├── models/                       # Database models
│   │   ├── User.js                   # User model (citizens & authorities)
│   │   └── Issue.js                  # Issue/report model
│   │
│   ├── routes/                       # API route handlers
│   │   ├── index.js                  # Route aggregator
│   │   ├── auth.js                   # Authentication routes
│   │   ├── issues.js                 # Issue management routes
│   │   ├── users.js                  # User profile routes
│   │   └── leaderboard.js            # Leaderboard & statistics
│   │
│   └── middleware/                   # Custom middleware
│       └── auth.js                   # JWT authentication middleware
│
├── frontend/                         # React Native Mobile App
│   ├── package.json                  # Frontend dependencies
│   ├── app.json                      # Expo configuration
│   ├── App.js                        # Main app component
│   │
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   └── IssueCard.js          # Issue display card
│   │   │
│   │   ├── context/                  # React Context providers
│   │   │   └── AuthContext.js        # Authentication state management
│   │   │
│   │   ├── navigation/               # Navigation configuration
│   │   │   ├── AuthNavigator.js      # Auth flow navigation
│   │   │   └── MainNavigator.js      # Main app navigation
│   │   │
│   │   ├── screens/                  # App screens
│   │   │   ├── SplashScreen.js       # Loading screen
│   │   │   │
│   │   │   ├── auth/                 # Authentication screens
│   │   │   │   ├── OnboardingScreen.js # App introduction
│   │   │   │   └── LoginScreen.js    # Login/Register
│   │   │   │
│   │   │   └── main/                 # Main app screens
│   │   │       ├── HomeFeedScreen.js # Issue feed
│   │   │       ├── ReportIssueScreen.js # Report new issue
│   │   │       ├── LeaderboardScreen.js # Rankings
│   │   │       ├── MyReportsScreen.js # User's reports
│   │   │       ├── ProfileScreen.js  # User profile
│   │   │       └── IssueDetailScreen.js # Issue details
│   │   │
│   │   ├── services/                 # External service integrations
│   │   │   └── api.js                # API client
│   │   │
│   │   └── theme/                    # Design system
│   │       └── colors.js             # Colors, typography, spacing
│   │
│   └── assets/                       # Static assets
│       ├── fonts/                    # Custom fonts (Poppins)
│       ├── images/                   # App images
│       └── icons/                    # App icons
│
└── docs/                            # Documentation
    ├── API_DOCUMENTATION.md         # API endpoint documentation
    └── DESIGN_SPECIFICATIONS.md    # UI/UX design guidelines
```

## Key Features by Directory

### Backend (`/backend`)
- **Authentication**: JWT-based auth for citizens and authorities
- **Issue Management**: CRUD operations for civic issues
- **Image Upload**: Cloudinary integration for photos
- **Voting System**: Upvote/downvote functionality
- **Leaderboard**: Community rankings and statistics
- **Geolocation**: Location-based issue filtering

### Frontend (`/frontend`)
- **Mobile-First Design**: Optimized for mobile devices
- **Civic Color Palette**: Professional civic-tech styling
- **Real-time Updates**: Live issue status updates
- **Camera Integration**: Photo capture for issue reporting
- **Location Services**: GPS-based issue reporting
- **Offline Support**: Basic offline functionality

### Documentation (`/docs`)
- **API Docs**: Complete endpoint documentation
- **Design System**: Color palette, typography, spacing
- **Setup Guide**: Installation and configuration

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6
- **UI Library**: React Native Paper
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Maps**: React Native Maps
- **Animations**: React Native Animatable

### Development Tools
- **Package Manager**: npm
- **Code Style**: ESLint + Prettier
- **Version Control**: Git
- **API Testing**: Postman/Thunder Client
- **Database GUI**: MongoDB Compass

## Getting Started

1. **Quick Install**: Run `./install.sh` (Unix/Linux) or `install.bat` (Windows)
2. **Manual Setup**: Follow the detailed guide in `setup.md`
3. **API Testing**: Use the endpoints documented in `docs/API_DOCUMENTATION.md`
4. **Customization**: Modify colors and styling in `frontend/src/theme/colors.js`

## Development Workflow

1. **Backend Development**: Start with `npm run dev` in `/backend`
2. **Frontend Development**: Start with `npm start` in `/frontend`
3. **Database**: Use MongoDB Compass for data visualization
4. **Testing**: Use Expo Go app for mobile testing
5. **Debugging**: React Native Debugger for frontend issues

## Deployment Ready

The project structure is designed for easy deployment:
- **Backend**: Ready for Heroku, AWS, or any Node.js hosting
- **Frontend**: Ready for Expo build service or EAS Build
- **Database**: Compatible with MongoDB Atlas (cloud)
- **Images**: Cloudinary integration for scalable image storage