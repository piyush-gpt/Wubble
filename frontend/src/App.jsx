import { useEffect, useState } from 'react';
import { Play, Pause, Download, Heart, Moon, Sun, Music, Sparkles } from 'lucide-react';
import useStore from './store';
import './App.css';

function App() {
  const {
    moods,
    genres,
    currentTrack,
    isLoading,
    likedTracks,
    recentTracks,
    selectedMood,
    selectedGenre,
    isDarkMode,
    setSelectedMood,
    setSelectedGenre,
    toggleDarkMode,
    toggleLikeTrack,
    isTrackLiked,
    generateTrack,
    loadMoodsAndGenres,
  } = useStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    loadMoodsAndGenres();
  }, []);

  useEffect(() => {
    if (currentTrack) {
      if (audio) {
        audio.pause();
        audio.src = currentTrack.url;
      } else {
        const newAudio = new Audio(currentTrack.url);
        setAudio(newAudio);
      }
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!currentTrack) return;
    
    const link = document.createElement('a');
    link.href = currentTrack.url;
    link.download = `${currentTrack.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLike = () => {
    if (!currentTrack) return;
    toggleLikeTrack(currentTrack);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
            }`}>
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Wubble QuickTune</h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Mini AI Music Preview Generator</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100 shadow-md'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Mood & Genre Selector */}
          <div className={`p-6 rounded-2xl shadow-lg mb-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h2 className="text-xl font-semibold mb-6">Choose Your Vibe</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mood Selector */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mood
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedMood === mood
                          ? 'bg-purple-500 text-white shadow-md'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Selector */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Genre
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedGenre === genre
                          ? 'bg-purple-500 text-white shadow-md'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6">
              <button
                onClick={generateTrack}
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Track</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            {isLoading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Track Preview */}
          {currentTrack && (
            <div className={`p-6 rounded-2xl shadow-lg mb-8 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-xl font-semibold mb-6">Your Generated Track</h2>
              
              <div className="space-y-4">
                {/* Track Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentTrack.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-purple-600' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {currentTrack.mood}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-pink-600' : 'bg-pink-100 text-pink-800'
                    }`}>
                      {currentTrack.genre}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {currentTrack.duration}
                    </span>
                  </div>
                </div>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className={`p-4 rounded-full transition-all ${
                      isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={handleDownload}
                    className={`p-3 rounded-full transition-all ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full transition-all ${
                      isTrackLiked(currentTrack.id)
                        ? 'bg-red-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${
                      isTrackLiked(currentTrack.id) ? 'fill-current' : ''
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recent Tracks */}
          {recentTracks.length > 0 && (
            <div className={`p-6 rounded-2xl shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-xl font-semibold mb-6">Recent Tracks</h2>
              <div className="grid gap-3">
                {recentTracks.slice(0, 5).map((track) => (
                  <div
                    key={track.id}
                    className={`p-4 rounded-lg transition-all cursor-pointer ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => useStore.getState().setCurrentTrack(track)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isDarkMode ? 'bg-purple-600' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {track.mood}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isDarkMode ? 'bg-pink-600' : 'bg-pink-100 text-pink-800'
                          }`}>
                            {track.genre}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLikeTrack(track);
                        }}
                        className={`p-2 rounded-full ${
                          isTrackLiked(track.id)
                            ? 'text-red-500'
                            : isDarkMode
                            ? 'text-gray-400 hover:text-gray-300'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${
                          isTrackLiked(track.id) ? 'fill-current' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
