import React, { useState, useRef } from 'react'

export const JournalInput = ({ onSave }) => {
    const [entry, setentry] = useState(' ');
    const textareaRef = useRef();

    const handleChange = (e) => {
    setentry(e.target.value);

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

    const handleSave=()=>{
        if(entry.trim()==='') return;
        onSave(entry);
        setentry('');
        textareaRef.current.style.height = '2.5rem';
    }

  return (
    <section className="w-full py-16 px-4 ">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        <p className='text-[#af3264] text-center py-0.5'>
              ────୨ৎ────
            </p>
            <textarea
                ref={textareaRef} 
                className="w-full h-10 bg-[#f9f3f2] p-1.5 pl-2 border border-gray-300 rounded-md resize-none text-gray-800 "
                placeholder='Type your thoughts here...'
                value={entry}
                onChange={handleChange}
                >
            </textarea>
            <button
            className="bg-[#af3264] cursor-pointer text-[#F5E3E0] px-6 py-2 rounded-md hover:bg-pink-700 transition"
            onClick={handleSave}>
                Save Entry
            </button>

        </div>
    </section >
  )
}

export default JournalInput