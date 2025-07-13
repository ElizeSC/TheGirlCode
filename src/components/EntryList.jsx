import React , { forwardRef } from 'react';
import EntryCard from './EntryCard';


export const EntryList = forwardRef(({ entries, onDelete, onEdit }, ref) => {
  return (
    <section ref={ref} id="entry-section" className="w-full my-48 py-4 px-4 border border-[#af3264] rounded-3xl shadow-[4px_4px_4px_0_#00000040] bg-pink-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold pb-0 text-[#4a2b2b] text-center">
          Your Entries
        </h2>
        <p className='text-[#4a2b2b] text-center py-0.5'>
          . ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁.
          </p>

        {entries.length === 0 ? (
          <p className="text-[#4a2b2b] text-center">
            Your entries are safely stored here!
          </p>
        ) : (
          <div className="flex flex-wrap justify-start gap-3">
            {entries.map((entry, index) => (
            <EntryCard 
              entry={entry} 
              index={index} 
              onDelete={onDelete} 
              onEdit={onEdit}
              key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default EntryList;
