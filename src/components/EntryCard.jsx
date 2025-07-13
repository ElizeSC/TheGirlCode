import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FiTrash } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";


export const EntryCard = ({ entry, onDelete, index, onEdit }) => {
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(entry);

    const getPreview = (text) => {
    const trimmed = text.trim();
    if (trimmed.length > 100) {
        return trimmed.slice(0, 100) + '...';
    }
    return trimmed;
    };


    const handleToggle =()=>{
        setExpanded(!expanded);
        setIsEditing(false);
        setEditedText(entry);
    }

    const handleSave = () => {
      onEdit(index, editedText);
      setIsEditing(false);
    }

return (
  <>
    {!expanded && (
      <div
        className="bg-[#F5E3E0] w-40 h-40 rounded-xl shadow-md p-4 cursor-pointer hover:scale-105 transition flex flex-col items-center justify-start relative"
        onClick={handleToggle}
      >
        
        <div className="text-xl">📌</div>
        <p className="flex-grow text-gray-800 overflow-hidden text-sm mt-2 text-center break-words line-clamp-5 w-full px-2">
          {getPreview(entry)}
        </p>
      </div>
    )}

    {expanded && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-[#F5E3E0] w-full max-w-2xl h-[80vh] p-6 rounded-xl shadow-xl relative overflow-y-auto">
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

          {!isEditing? 
            (<button 
                className='cursor-pointer absolute top-4 left-12 hover:text-gray-500'
                onClick={()=>setIsEditing(true)}>
                <MdOutlineModeEdit size={18} />
              </button> ) :
            (
              <button 
                className='cursor-pointer absolute top-4 left-12 hover:text-gray-500'
                onClick={handleSave}>
                <IoMdCheckmark size={18}/>
              </button>
            )}

          {isEditing? (
            <textarea
              className='w-full h-full mt-10 p-4 rounded-lg border text-gray-800'
              value={editedText}
              onChange={(e)=>setEditedText(e.target.value)}>
            </textarea>
          ) : (
            <p className="text-gray-800 whitespace-pre-wrap">{entry}</p>
          )}
        </div>
      </div>
    )}
  </>
);
}

export default EntryCard