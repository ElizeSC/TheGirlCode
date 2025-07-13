import { useState, useRef, useEffect } from 'react';
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { JournalInput } from './components/JournalInput'
import EntryList from './components/EntryList'
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

  const [prompt, setPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const showRandomPrompt = () => {
    const random = prompts[Math.floor(Math.random()*prompts.length)];
    setPrompt(random);
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
    
      {showPrompt && (
  <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
    <div className="bg-white px-6 py-4 rounded-full shadow-lg text-pink-600 text-sm font-semibold border border-pink-300">
      ☁️ {prompt}
    </div>
  </div>
)}

  {showAbout && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-lg relative">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl cursor-pointer"
        onClick={() => setShowAbout(false)}
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
      </p>
    </div>
  </div>
)}
    
    </div>
  )
}

export default App
