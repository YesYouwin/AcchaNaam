import React from 'react';
import { Search, User, Command } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  title: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-12 h-20 bg-transparent z-40 sticky top-0 backdrop-blur-sm">
      <div className="flex items-center gap-8">
        <h2 className="font-headline text-xl font-bold text-on-surface">{title}</h2>
        <nav className="flex gap-6 font-sans text-sm font-medium">
          <button className="text-primary-container font-bold">Focus</button>
          <button className="text-on-surface-variant hover:text-secondary transition-all">Recent</button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group bg-surface-container-low rounded-full px-4 py-2 flex items-center gap-3 min-w-[320px] transition-all border border-transparent focus-within:border-primary-container/30 focus-within:shadow-[0_0_15px_rgba(0,229,255,0.1)]">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search the archive..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-on-surface-variant/50 text-on-surface"
          />
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-highest text-[10px] text-on-surface-variant font-mono">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 bg-surface-container-high/40 backdrop-blur rounded-lg text-xs font-bold font-headline hover:bg-surface-container-high transition-colors text-on-surface">
            Quick Note
          </button>
          <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
