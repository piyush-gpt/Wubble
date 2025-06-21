import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

const useStore = create(
  persist(
    (set, get) => ({
      // State
      moods: [],
      genres: [],
      currentTrack: null,
      isLoading: false,
      likedTracks: [],
      recentTracks: [],
      selectedMood: '',
      selectedGenre: '',
      isDarkMode: false,

      setMoods: (moods) => set({ moods }),
      setGenres: (genres) => set({ genres }),
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setLoading: (isLoading) => set({ isLoading }),
      setSelectedMood: (mood) => set({ selectedMood: mood }),
      setSelectedGenre: (genre) => set({ selectedGenre: genre }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      toggleLikeTrack: (track) => {
        const { likedTracks } = get();
        const isLiked = likedTracks.some(t => t.id === track.id);
        
        if (isLiked) {
          set({ likedTracks: likedTracks.filter(t => t.id !== track.id) });
        } else {
          set({ likedTracks: [...likedTracks, track] });
        }
      },

      addToRecentTracks: (track) => {
        const { recentTracks } = get();
        const filteredTracks = recentTracks.filter(t => t.id !== track.id);
        set({ recentTracks: [track, ...filteredTracks.slice(0, 9)] }); 
      },

      isTrackLiked: (trackId) => {
        const { likedTracks } = get();
        return likedTracks.some(track => track.id === trackId);
      },

      generateTrack: async () => {
        const { selectedMood, selectedGenre } = get();
        set({ isLoading: true });

        try {
          const response = await fetch(`${BACKEND_URL}/api/generate-track`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mood: selectedMood,
              genre: selectedGenre,
            }),
          });

          const data = await response.json();
          
          if (data.success) {
            set({ currentTrack: data.track });
            get().addToRecentTracks(data.track);
          }
        } catch (error) {
          console.error('Error generating track:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      loadMoodsAndGenres: async () => {
        try {
          const [moodsResponse, genresResponse] = await Promise.all([
            fetch(`${BACKEND_URL}/api/moods`),
            fetch(`${BACKEND_URL}/api/genres`),
          ]);

          const moodsData = await moodsResponse.json();
          const genresData = await genresResponse.json();

          const moods = moodsData.success ? moodsData.data : moodsData;
          const genres = genresData.success ? genresData.data : genresData;

          set({ moods, genres });
        } catch (error) {
          console.error('Error loading moods and genres:', error);
        }
      },
    }),
    {
      name: 'wubble-storage',
      partialize: (state) => ({
        likedTracks: state.likedTracks,
        recentTracks: state.recentTracks,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useStore; 