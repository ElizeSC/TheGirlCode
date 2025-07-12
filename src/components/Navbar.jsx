import React from 'react'
import logo from '../assets/logo.png'

export const Navbar = ({ onPromptClick, onMyEntriesClick, onAboutClick }) => {
  return (
    <nav className='max-w-[1240px] h-16 flex items-center bg-[#af3264] rounded-2xl shadow-[4px_4px_4px_0_#00000040]'>
        <div>
            <img src={logo} className='w-auto h-15 p-2'/>
        </div>
        <div className='font-[Arial] pl-2 flex items-center px-auto mx-auto justify-between text-[#F5E3E0] '>
             <ul className="flex justify-end items-center space-x-20 text-[#F5E3E0] font-[Arial] mr-2.5">
                <li 
                onClick={onPromptClick}
                className="hover:text-pink-300 hover:scale-105 cursor-pointer transition duration-150"
                >
                    ✨ Prompts
                </li>
                
                <li 
                className="hover:text-pink-300 hover:scale-105 cursor-pointer transition duration-150"
                onClick={onMyEntriesClick}>
                    📖 My Entries
                </li>
                
                <li
                onClick={onAboutClick} 
                className="hover:text-pink-300 hover:scale-105 cursor-pointer transition duration-150"
                >
                    👓 About the Dev
                </li>
      </ul>
        </div>

    </nav>
  )
}

export default Navbar
