import React from 'react';
import { cn, type Note } from '../lib/utils';
import { Star, MoreHorizontal, Paperclip, MessageSquare, Pin } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  featured?: boolean;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, featured }) => {
  if (featured) {
    return (
      <article className="col-span-2 glass-card rounded-[2rem] p-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors" />
        
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              {note.category}
            </span>
            {note.pinned && (
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                Pinned
              </span>
            )}
          </div>
          <span className="text-on-surface-variant text-[10px] font-mono">ID: {note.id}</span>
        </div>

        <h4 className="text-2xl font-headline font-bold mb-4 leading-tight group-hover:text-primary transition-colors relative z-10">
          {note.title}
        </h4>
        
        <p className="text-on-surface-variant leading-relaxed text-sm mb-8 max-w-xl relative z-10">
          {note.content}
        </p>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex -space-x-2">
            {[...Array(note.collaborators || 0)].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/user${i}/50/50`} 
                  alt="Avatar" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            {(note.collaborators || 0) > 2 && (
              <div className="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-background flex items-center justify-center text-[8px] font-bold text-on-surface-variant">
                +3
              </div>
            )}
          </div>
          <time className="text-[10px] text-on-surface-variant font-mono">Last edited {note.date}</time>
        </div>
      </article>
    );
  }

  return (
    <article className="glass-card rounded-[1.5rem] p-6 group hover:border-secondary/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-2 h-2 rounded-full shadow-[0_0_8px]",
            note.category === 'Ideas' ? "bg-primary shadow-primary/50" :
            note.category === 'Personal' ? "bg-secondary shadow-secondary/50" :
            "bg-tertiary shadow-tertiary/50"
          )} />
          <h4 className="font-headline font-bold group-hover:text-primary transition-colors truncate max-w-[180px]">
            {note.title}
          </h4>
        </div>
        {note.pinned && <Pin className="w-3 h-3 text-on-surface-variant" />}
      </div>

      <p className="text-xs text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
        {note.content}
      </p>

      {note.progress !== undefined && (
        <div className="mb-4">
          <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-container shadow-[0_0_8px_#00daf3] transition-all duration-500" 
              style={{ width: `${note.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-on-surface-variant opacity-40 uppercase">{note.progress}% Complete</span>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-outline-variant flex items-center justify-between text-on-surface-variant">
        <div className="flex gap-3">
          <Paperclip className="w-3.5 h-3.5" />
          <MessageSquare className="w-3.5 h-3.5" />
        </div>
        <span className="text-[10px] font-mono">{note.date}</span>
      </div>
    </article>
  );
};
