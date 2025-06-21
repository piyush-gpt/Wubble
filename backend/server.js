const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: [
    'https://wubble-phi.vercel.app', 
    'http://localhost:5173', 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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
  try {
    res.json({
      success: true,
      data: moods,
      count: moods.length
    });
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch moods',
      code: 'MOODS_FETCH_ERROR'
    });
  }
});

app.get('/api/genres', (req, res) => {
  try {
    res.json({
      success: true,
      data: genres,
      count: genres.length
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch genres',
      code: 'GENRES_FETCH_ERROR'
    });
  }
});

app.post('/api/generate-track', (req, res) => {
  const { mood, genre } = req.body;
  
  setTimeout(() => {
    // Filter tracks by mood and genre, or get random track if no match
    let filteredTracks = sampleTracks;
    
    try{if (mood && genre) {
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
  } catch (error) {
    console.error('Error generating track:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate track',
      code: 'GENERATE_TRACK_ERROR'
    });
  }
  }, 2000); // 2 second delay to simulate generation
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});