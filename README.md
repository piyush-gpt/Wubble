# 🎧 Wubble QuickTune Mini AI Music Preview Generator

A single-page web application that mimics Wubble's user flow for generating AI music previews. Choose your mood and genre, generate a track, and enjoy royalty-free music with download capabilities.

## ✨ Features

### Core Features
- **Mood & Genre Selector**: Choose from Happy, Sad, Energetic, Chill moods and Pop, Lo-fi, Cinematic, EDM genres
- **Generate Button**: Simulates track generation with a 2-second loading animation
- **Track Preview**: Displays track title, mood/genre tags, and duration
- **Audio Controls**: Play/pause functionality with visual feedback
- **Download Button**: Download generated tracks as MP3 files
- **Like/Favorite System**: Save tracks to favorites (stored in localStorage)

### Bonus Features
- **Dark Mode**: Toggle between light and dark themes
- **Progress Bar**: Animated progress bar during music generation
- **Recent Tracks**: View and replay recently generated tracks
- **Responsive Design**: Beautiful UI that works on all devices
- **Smooth Animations**: Enhanced user experience with CSS animations

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wubble
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to use the application

## 📱 How to Use

1. **Choose Your Vibe**: Select a mood (Happy, Sad, Energetic, Chill) and genre (Pop, Lo-fi, Cinematic, EDM)
2. **Generate Track**: Click the "Generate Track" button to create a new music preview
3. **Listen & Download**: Use the play/pause button to listen to your track, then download it
4. **Save Favorites**: Click the heart icon to save tracks to your favorites
5. **Toggle Dark Mode**: Use the moon/sun icon in the header to switch themes
6. **View Recent Tracks**: Scroll down to see your recently generated tracks


## 🔧 API Endpoints

### Backend API
- `GET /api/moods` - Get available moods
- `GET /api/genres` - Get available genres
- `POST /api/generate-track` - Generate a track based on mood and genre

### Request Format
```json
{
  "mood": "Happy",
  "genre": "Pop"
}
```

### Response Format
```json
{
  "success": true,
  "track": {
    "id": 1,
    "title": "Sunny Day Vibes",
    "mood": "Happy",
    "genre": "Pop",
    "url": "https://example.com/track.mp3",
    "duration": "2:30"
  }
}
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Transitions**: CSS animations for enhanced user experience
- **Accessibility**: Proper focus states and keyboard navigation
- **Dark Mode**: Eye-friendly dark theme option
- **Loading States**: Visual feedback during track generation

## 📁 Project Structure

```
Wubble/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Custom styles and animations
│   │   ├── store.js       # Zustand state management
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # Project documentation
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting service

### Backend (Heroku/Railway)
1. Ensure all dependencies are in `package.json`
2. Set environment variables if needed
3. Deploy to your preferred hosting service



## 🎯 Future Enhancements

- Real AI music generation integration
- User authentication and profiles
- Social sharing features
- Advanced audio controls (volume, seek)
- Playlist creation
- More mood and genre options
- Analytics and usage tracking

---

**Built with ❤️ for the Wubble team** 
