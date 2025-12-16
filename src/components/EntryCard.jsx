import { useState } from 'react';
import { IoMdClose, IoMdMusicalNote, IoMdCheckmark } from 'react-icons/io';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineModeEdit } from 'react-icons/md';

export const EntryCard = ({ entry, onDelete, index, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(entry.text || entry);

  // Handle both old format (string) and new format (object with text and song)
  const entryText = typeof entry === 'string' ? entry : entry.text;
  const entrySong = typeof entry === 'object' ? entry.song : null;

  const getPreview = (text) => {
    const trimmed = text.trim();
    if (trimmed.length > 100) {
      return trimmed.slice(0, 100) + '...';
    }
    return trimmed;
  };

  const handleToggle = () => {
    setExpanded(!expanded);
    setIsEditing(false);
    setEditedText(entryText);
  };

  const handleSave = () => {
    // Preserve the song data when editing
    const updatedEntry = typeof entry === 'object' 
      ? { ...entry, text: editedText }
      : editedText;
    onEdit(index, updatedEntry);
    setIsEditing(false);
  };

  return (
    <>
      {!expanded && (
        <div
          className="bg-[#F5E3E0] w-40 h-40 rounded-xl shadow-md p-4 cursor-pointer hover:scale-105 transition flex flex-col items-center justify-start relative"
          onClick={handleToggle}
        >
          <div className="text-xl">📌</div>
          {entrySong && (
            <div className="absolute top-2 right-2 text-[#af3264]">
              <IoMdMusicalNote size={16} />
            </div>
          )}
          <p className="flex-grow text-gray-800 overflow-hidden text-sm mt-2 text-center break-words line-clamp-5 w-full px-2">
            {getPreview(entryText)}
          </p>
        </div>
      )}

      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-[#F5E3E0] w-full max-w-2xl max-h-[80vh] p-6 rounded-xl shadow-xl relative overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
              onClick={handleToggle}
            >
              <IoMdClose />
            </button>

            <button
              className="absolute top-4 left-4 cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => {
                onDelete(index);
                setExpanded(false);
              }}
            >
              <FiTrash size={18} />
            </button>

            {!isEditing ? (
              <button
                className="cursor-pointer absolute top-4 left-12 hover:text-gray-500"
                onClick={() => setIsEditing(true)}
              >
                <MdOutlineModeEdit size={18} />
              </button>
            ) : (
              <button
                className="cursor-pointer absolute top-4 left-12 hover:text-gray-500"
                onClick={handleSave}
              >
                <IoMdCheckmark size={18} />
              </button>
            )}

            <div className="mt-10">
              {isEditing ? (
                <textarea
                  className="w-full min-h-[200px] p-4 rounded-lg border text-gray-800 resize-y"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
              ) : (
                <p className="text-gray-800 whitespace-pre-wrap">{entryText}</p>
              )}

              {entrySong && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-pink-200">
                  <div className="flex items-center gap-4">
                    {entrySong.albumCover && (
                      <img
                        src={entrySong.albumCover}
                        alt={entrySong.album}
                        className="w-20 h-20 rounded-md object-cover shadow-sm"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <IoMdMusicalNote className="text-[#af3264]" />
                        <p className="font-semibold text-gray-800 truncate">
                          {entrySong.title}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {entrySong.artist}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {entrySong.album}
                      </p>
                      {entrySong.spotifyUrl && (
                        <a
                          href={entrySong.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#af3264] hover:underline mt-2 inline-block"
                        >
                          Listen on Spotify →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryCard;