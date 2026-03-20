import React, { useEffect, useState } from 'react';
import { NoteCard } from '../components/NoteCard';
import { MOCK_REMINDERS, cn, type Note } from '../lib/utils';
import { Calendar, Bolt, CheckCircle2, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { listNotes } from '../lib/notesApi';

export const DashboardView: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const fetched = await listNotes(10);
        if (!cancelled) setNotes(fetched);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (!cancelled) setIsLoadingNotes(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredNote = notes.find((n) => n.pinned) ?? notes[0];
  const secondaryNotes = featuredNote ? notes.filter((n) => n.id !== featuredNote.id).slice(0, 2) : notes.slice(0, 2);

  return (
    <div className="flex-1 p-12 pt-4 grid grid-cols-12 gap-8">
      {/* Left Section: Notes Grid */}
      <section className="col-span-8 flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-primary font-headline font-medium tracking-widest text-[10px] uppercase mb-1">Cerebral Storage</p>
            <h3 className="text-4xl font-headline font-bold text-on-surface tracking-tight">Recent Thoughts</h3>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant">
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {featuredNote && <NoteCard note={featuredNote} featured />}
          {!isLoadingNotes && !featuredNote && (
            <div className="col-span-2 text-on-surface-variant">
              No notes yet. Create one in the editor.
            </div>
          )}
          {secondaryNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}

          {/* Neural Sync Card */}
          <article className="col-span-2 p-1 rounded-[1.5rem] bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20">
            <div className="bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-[1.4rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <Bolt className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h5 className="font-headline font-bold text-on-surface">Neural Sync Active</h5>
                  <p className="text-[11px] text-on-surface-variant">Capturing thoughts via ambient interface</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-on-surface text-surface text-xs font-bold rounded-lg hover:scale-105 transition-transform">
                View Stream
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Right Section: Chronos Sidebar */}
      <aside className="col-span-4 flex flex-col gap-8">
        <div className="glass-card border border-white/5 rounded-[2rem] p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline font-bold text-xl">Chronos</h3>
            <Calendar className="w-5 h-5 text-on-surface-variant" />
          </div>

          <div className="space-y-6 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">Upcoming Pulses</p>
            
            {MOCK_REMINDERS.slice(0, 3).map((reminder, idx) => (
              <div key={reminder.id} className="relative group">
                {idx === 0 && (
                  <div className="absolute -left-2 top-0 bottom-0 w-1 bg-secondary rounded-full animate-pulse blur-[2px]" />
                )}
                <div className={cn("pl-4", idx !== 0 && "border-l-2 border-outline-variant/30")}>
                  <div className="flex justify-between items-start mb-1">
                    <h5 className={cn("text-sm font-bold text-on-surface", reminder.completed && "line-through opacity-50")}>
                      {reminder.title}
                    </h5>
                    {reminder.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" />
                    ) : (
                      <span className={cn("text-[10px] font-mono", reminder.overdue ? "text-error" : "text-on-surface-variant")}>
                        {reminder.due.split('•')[1] || reminder.due}
                      </span>
                    )}
                  </div>
                  {!reminder.completed && (
                    <>
                      <p className="text-[11px] text-on-surface-variant mb-3 line-clamp-2">
                        {reminder.title === 'System Diagnostic' ? 'Ensure the archive integrity protocol is running smoothly before the backup.' : 'Reviewing the storage quotas for the Neon District project.'}
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-secondary/10 hover:bg-secondary/20 text-secondary text-[9px] font-bold rounded-full transition-colors">Postpone</button>
                        <button className="px-3 py-1 bg-on-surface/5 hover:bg-on-surface/10 text-on-surface-variant text-[9px] font-bold rounded-full transition-colors">Dismiss</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-white/5 text-center">
              <p className="text-[10px] text-on-surface-variant mb-4 uppercase tracking-widest font-bold">Storage Capacity</p>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full mb-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '72%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_10px_rgba(0,229,255,0.4)]" 
                />
              </div>
              <p className="text-[10px] text-on-surface-variant font-mono">7.2 / 10.0 TB Processed</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
