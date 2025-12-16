import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

export const SongInput = ({value, onChange, onClose, onSave }) => {
    
  return (
    <div className="fixed inset-0.5 bg-black/30 z-50 flex items-center justify-center">
        <div className='big-white bg-[#F5E3E0] rounded-xl shadow-xl relative max-w-md w-full border-0.5 border-gray-700'>
            <IoMdClose 
            onClick={onClose}
            className='absolute top-3 right-4 text-[#af3264] cursor-pointer hover:text-[#af3264c4]'/>

            <h2
            className='font-semibold mb-4 text-lg text-center mt-4 text-[#4a2b2b]'>
                🎵 Did you think about a song today?
            </h2>
            <input
                className='w-[85%] p-2 border rounded mb-4'
                type='text'
                value={value}
                onChange={onChange}
                placeholder='paste spotify link here'>
            </input>
            <IoMdCheckmark 
                className='text-[#4a2b2b] px-4 py-2 mx-auto block'
                onClick={onSave}
            />
        </div>
    </div>
  )
}

export default SongInput