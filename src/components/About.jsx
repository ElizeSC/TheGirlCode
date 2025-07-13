import React from 'react'
import { PiInstagramLogoLight } from "react-icons/pi";

export const About = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#af3264] mb-4 text-center">👓 About the Dev</h2>
        <p className="text-gray-800 leading-relaxed text-sm text-center">
          Hii! I'm <span className="font-semibold">Elize!</span> I'm a sophomore Computer Science student at the University of the Philippines - Tacloban College, and this is my first web app 💖<br /><br />
          I built this digital journal so people can express anything freely: feelings, ideas, or whatever’s on your mind.
          It’s my safe space and I hope it becomes yours too! I’m still learning WebDev, mainly React and Tailwind, but I’m so proud of this. 💫
          <br /><br />
          Thanks for visiting! ☁️
          <br /><br />
          Connect with me!
          <div className='flex justify-center space-x-6 mt-0.5'>
            <a href='https://www.instagram.com/elle.izexo/' target="_blank" rel="noopener noreferrer">
              <PiInstagramLogoLight className='text-2xl text-[#af3264] hover:text-[#8f1143] cursor-pointer' />
            </a>
          </div>
        </p>
      </div>
    </div>
  );
}
export default About;