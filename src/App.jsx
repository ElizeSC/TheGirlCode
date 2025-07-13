import { useState, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Prompt } from './components/Prompt';
import { JournalInput } from './components/JournalInput';
import { EntryList } from './components/EntryList';
import { PiInstagramLogoLight } from "react-icons/pi";

import './App.css'

function App() {

  const editEntry = (indexToEdit, newText) => {
  const updated = entries.map((entry, index) =>
    index === indexToEdit ? newText : entry
  );
  setEntries(updated);
};

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('entries');
    return saved ? JSON.parse(saved) : [];
  });

  const deleteEntry=(indexToDelete)=>{
    const updated=entries.filter((_, index)=>index !== indexToDelete);
    setEntries(updated);
  }

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  const entriesRef = useRef(null);

  const prompts = [
    "What made you smile today?",
    "Describe a peaceful moment you had recently.",
    "Write about something you're grateful for.",
    "If today were a movie scene, what would it be?",
    "Write a letter to your future self."
  ];

  const [currentPrompt, setCurrentPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const showRandomPrompt = () => {
    const random = prompts[Math.floor(Math.random()*prompts.length)];
    setCurrentPrompt(random);
    setShowPrompt(true);
    setTimeout(()=> setShowPrompt(false),10000);
  }

  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen w-full">
        <Navbar 
          onMyEntriesClick={()=>entriesRef.current?.scrollIntoView({behavior: 'smooth' })}
          onPromptClick={showRandomPrompt}
          onAboutClick={() => setShowAbout(true)}
           />
        <Hero />
        <JournalInput onSave={handleSaveEntry} />
        <div ref={entriesRef}>
          <EntryList entries={entries} onDelete={deleteEntry} onEdit={editEntry} />
        </div>
    
       <Prompt message={currentPrompt} isVisible={showPrompt} />
       <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
}

export default App
