import { useState, useRef } from 'react';
import { IoMdMusicalNote, IoMdClose } from 'react-icons/io';
import SpotifySearchModal from './SpotifySearchModal';

export const JournalInput = ({ onSave }) => {
  const [entry, setEntry] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [showSpotifyModal, setShowSpotifyModal] = useState(false);
  const textareaRef = useRef();

  const handleChange = (e) => {
    setEntry(e.target.value);
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSave = () => {
    if (entry.trim() === '') return;
    
    // Save entry with song data if selected
    const entryData = {
      text: entry,
      song: selectedSong,
      timestamp: new Date().toISOString()
    };
    
    onSave(entryData);
    setEntry('');
    setSelectedSong(null);
    textareaRef.current.style.height = '2.5rem';
  };

  const handleSelectSong = (songData) => {
    setSelectedSong(songData);
  };

  const removeSong = () => {
    setSelectedSong(null);
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <p className="text-[#af3264] text-center py-0.5">
          ────୨ৎ────
        </p>
        
        <textarea
          ref={textareaRef}
          className="w-full h-10 bg-[#f9f3f2] p-1.5 pl-2 border border-gray-300 rounded-md resize-none text-gray-800"
          placeholder="Type your thoughts here..."
          value={entry}
          onChange={handleChange}
        />

        {selectedSong && (
          <div className="w-full bg-pink-50 border border-pink-200 rounded-lg p-3 flex items-center gap-3">
            {selectedSong.albumCover && (
              <img
                src={selectedSong.albumCover}
                alt={selectedSong.album}
                className="w-12 h-12 rounded-md object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {selectedSong.title}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {selectedSong.artist}
              </p>
            </div>
            <button
              onClick={removeSong}
              className="text-gray-500 hover:text-red-600 cursor-pointer"
            >
              <IoMdClose size={20} />
            </button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          <button
            className="bg-white border-2 border-[#af3264] text-[#af3264] px-4 py-2 rounded-md hover:bg-pink-50 transition flex items-center gap-2 cursor-pointer"
            onClick={() => setShowSpotifyModal(true)}
          >
            <IoMdMusicalNote /> Add Song
          </button>
          
          <button
            className="bg-[#af3264] cursor-pointer text-[#F5E3E0] px-6 py-2 rounded-md hover:bg-pink-700 transition"
            onClick={handleSave}
          >
            Save Entry
          </button>
        </div>
      </div>

      <SpotifySearchModal
        isOpen={showSpotifyModal}
        onClose={() => setShowSpotifyModal(false)}
        onSelectSong={handleSelectSong}
      />
    </section>
  );
};

export default JournalInput;