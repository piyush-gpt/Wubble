const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Wubble QuickTune API!',
    status: 'UP',
    documentation: '/readme',
  });
});

const moods = ['Happy', 'Sad', 'Energetic', 'Chill'];
const genres = ['Pop', 'Lo-fi', 'Cinematic', 'EDM'];

// Sample tracks with royalty-free music URLs
const sampleTracks = [
  {
    id: 1,
    title: "Sunny Day Vibes",
    mood: "Happy",
    genre: "Pop",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "2:30"
  },
  {
    id: 2,
    title: "Midnight Dreams",
    mood: "Chill",
    genre: "Lo-fi",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "3:15"
  },
  {
    id: 3,
    title: "Electric Pulse",
    mood: "Energetic",
    genre: "EDM",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "2:45"
  },
  {
    id: 4,
    title: "Melancholy Echo",
    mood: "Sad",
    genre: "Cinematic",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "4:20"
  },
  {
    id: 5,
    title: "Dance Floor Heat",
    mood: "Energetic",
    genre: "Pop",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "2:55"
  },
  {
    id: 6,
    title: "Cozy Evening",
    mood: "Chill",
    genre: "Lo-fi",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "3:30"
  },
  {
    id: 7,
    title: "Epic Journey",
    mood: "Energetic",
    genre: "Cinematic",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "5:10"
  },
  {
    id: 8,
    title: "Digital Waves",
    mood: "Happy",
    genre: "EDM",
    url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    duration: "3:05"
  }
];

// Routes
app.get('/api/moods', (req, res) => {
  res.json(moods);
});

app.get('/api/genres', (req, res) => {
  res.json(genres);
});

app.post('/api/generate-track', (req, res) => {
  const { mood, genre } = req.body;
  
  setTimeout(() => {
    // Filter tracks by mood and genre, or get random track if no match
    let filteredTracks = sampleTracks;
    
    if (mood && genre) {
      filteredTracks = sampleTracks.filter(track => 
        track.mood.toLowerCase() === mood.toLowerCase() && 
        track.genre.toLowerCase() === genre.toLowerCase()
      );
    } else if (mood) {
      filteredTracks = sampleTracks.filter(track => 
        track.mood.toLowerCase() === mood.toLowerCase()
      );
    } else if (genre) {
      filteredTracks = sampleTracks.filter(track => 
        track.genre.toLowerCase() === genre.toLowerCase()
      );
    }
    
    // If no matches, return a random track
    if (filteredTracks.length === 0) {
      filteredTracks = sampleTracks;
    }
    
    const randomTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
    
    res.json({
      success: true,
      track: randomTrack
    });
  }, 2000); // 2 second delay to simulate generation
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});