# 🌍 Group Trip Sync

A modern web application for planning and coordinating group travel adventures. Connect with like-minded travelers, create unforgettable experiences, and discover new destinations together.

![Group Trip Sync](https://img.shields.io/badge/Status-In%20Development-yellow)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)

## ✨ Features

### 🎯 Current Features
- **Trip Creation**: Create detailed itineraries with destinations, dates, and budget information
- **Social Interaction**: Like and comment on trip proposals
- **Group Management**: Join trips and manage participant limits
- **Real-time Updates**: Socket.io integration for live updates
- **Responsive Design**: Beautiful, modern UI with Tailwind CSS
- **User Authentication**: Secure login and registration system

### 🚀 Upcoming Features
- **Trip Dashboard**: Comprehensive trip management interface
- **Travel History**: Track past adventures and statistics
- **Advanced Search**: Filter trips by destination, dates, budget, and vibe tags
- **Chat System**: Real-time messaging between trip participants
- **Photo Sharing**: Share memories from your adventures
- **Itinerary Builder**: Detailed day-by-day planning tools

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/dheerajraqesh/group-trip-sync.git
cd group-trip-sync
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Add your MongoDB connection string, JWT secret, etc.
```

#### Environment Variables
Create a `.env` file in the server directory with:
```env
MONGO_URI=mongodb://localhost:27017/group-trip-sync
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

### 4. Start the Application

#### Option 1: Run Both Services Separately
```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm start
```

#### Option 2: Using Docker (Coming Soon)
```bash
docker-compose up
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
group-trip-sync/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── ItineraryCard.jsx
│   │   │   └── ItineraryCreationForm.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx        # Main App component
│   │   ├── index.js       # Entry point
│   │   ├── index.css      # Global styles
│   │   └── socket.js      # Socket.io configuration
│   ├── package.json
│   └── tailwind.config.js # Tailwind CSS configuration
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   └── db.js         # Database connection
│   ├── models/           # Mongoose models
│   │   └── User.js
│   ├── routes/           # API routes
│   │   └── auth.js
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Entry point
│   ├── package.json
│   └── .env              # Environment variables
├── docker-compose.yml    # Docker configuration (Coming Soon)
└── README.md            # This file
```

## 🎨 UI Components

### ItineraryCard
A beautiful, interactive card component that displays:
- Trip destination and title
- Participant count and limits
- Budget information
- Dates and vibe tags
- Like and join functionality
- Comments section

### ItineraryCreationForm
A comprehensive form for creating new trip itineraries with:
- Destination selection
- Date picker
- Budget planning
- Vibe tag selection
- Description and details

## 🔧 Development

### Available Scripts

#### Frontend (client/)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

#### Backend (server/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Code Style
- **Frontend**: ESLint with React configuration
- **Backend**: Node.js best practices
- **Styling**: Tailwind CSS utility classes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Itinerary Endpoints
- `GET /api/itineraries` - Get all itineraries
- `POST /api/itineraries` - Create new itinerary
- `POST /api/itineraries/:id/like` - Like an itinerary
- `POST /api/itineraries/:id/comment` - Add comment
- `POST /api/itineraries/:id/join` - Join a trip

## 🐛 Known Issues

- Dashboard functionality is currently in development
- User authentication flow needs completion
- Real-time notifications need implementation

**Happy Traveling! 🎒✈️**
