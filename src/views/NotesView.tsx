import React, { useEffect, useState } from 'react';
import { NoteCard } from '../components/NoteCard';
import { listNotes } from '../lib/notesApi';
import { cn, type Note } from '../lib/utils';

export const NotesView: React.FC = () => {
  const categories = ['All Notes', 'Ideas', 'Personal', 'Work'];
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const fetched = await listNotes(60);
        if (!cancelled) setNotes(fetched);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-12 py-8 flex-1">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h3 className="font-headline text-4xl font-bold tracking-tight mb-2">Memory Stream</h3>
          <p className="text-on-surface-variant font-sans">Capture thoughts in the silence of the void.</p>
        </div>
        <div className="flex gap-3">
          {categories.map((cat, i) => (
            <span 
              key={cat}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                i === 0 
                  ? "bg-surface-container-high text-secondary shadow-[0_0_10px_rgba(205,189,255,0.2)]" 
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full text-on-surface-variant">Loading notes...</div>
        ) : notes.length ? (
          notes.map((note) => <NoteCard key={note.id} note={note} />)
        ) : (
          <div className="col-span-full text-on-surface-variant">
            No notes yet. Create one in the editor.
          </div>
        )}
      </div>
    </section>
  );
};
