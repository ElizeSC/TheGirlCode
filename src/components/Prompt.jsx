import React from 'react'

export const Prompt = ({ message, isVisible }) => {
    if (!isVisible) return null;

  return (
     <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white px-6 py-4 rounded-full shadow-lg text-pink-600 text-sm font-semibold border border-pink-300">
        ☁️ {message}
      </div>
    </div>
  )
}

export default Prompt