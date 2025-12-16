import { useState } from 'react';
import { IoMdClose, IoMdMusicalNote } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

export const SpotifySearchModal = ({ isOpen, onClose, onSelectSong }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Backend API URL - change this based on your deployment
  const API_URL = 'http://localhost:3002';

  const searchSpotify = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_URL}/api/spotify/search?q=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search Spotify');
      }
      
      const data = await response.json();
      setSearchResults(data.tracks?.items || []);
    } catch (error) {
      console.error('Error searching Spotify:', error);
      setError('Failed to search for songs. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchSpotify();
    }
  };

  const handleSelectSong = (track) => {
    const songData = {
      id: track.id,
      title: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      albumCover: track.album.images[0]?.url || '',
      spotifyUrl: track.external_urls.spotify
    };
    onSelectSong(songData);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[80vh] rounded-2xl shadow-lg relative flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer z-10"
          onClick={handleClose}
        >
          <IoMdClose />
        </button>
        
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-[#af3264] mb-4 flex items-center gap-2">
            <IoMdMusicalNote /> Search Spotify
          </h2>
          
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a song..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#af3264]"
              />
            </div>
            <button
              onClick={searchSpotify}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-[#af3264] text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSearch />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {searchResults.length === 0 && !isSearching && !error && (
            <p className="text-gray-500 text-center py-8">
              Search for a song to add to your entry 🎵
            </p>
          )}
          
          {isSearching && (
            <p className="text-gray-500 text-center py-8">Searching...</p>
          )}
          
          <div className="space-y-3">
            {searchResults.map((track) => (
              <div
                key={track.id}
                onClick={() => handleSelectSong(track)}
                className="flex items-center gap-4 p-3 hover:bg-pink-50 rounded-lg cursor-pointer transition border border-transparent hover:border-pink-200"
              >
                {track.album.images[0] && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {track.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {track.artists.map(a => a.name).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {track.album.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifySearchModal;