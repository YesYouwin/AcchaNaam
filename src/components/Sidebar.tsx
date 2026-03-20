import React from 'react';
import { Home, StickyNote, Bell, Archive, Settings, HelpCircle, Plus } from 'lucide-react';
import { cn, type View } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'reminders', icon: Bell, label: 'Reminders' },
    { id: 'archive', icon: Archive, label: 'Archive' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col w-64 border-r border-white/10 bg-background/60 backdrop-blur-xl z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Archive className="w-5 h-5 text-on-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-on-surface font-headline">The Archive</h1>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-medium ml-11">Midnight Sanctuary</p>
      </div>

      <div className="px-6 mb-8">
        <button 
          onClick={() => onViewChange('editor')}
          className="w-full py-3 px-4 flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container rounded-xl text-on-primary font-headline font-bold text-sm transition-all hover:opacity-90 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          <Plus className="w-5 h-5" />
          New Entry
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                "w-full flex items-center gap-4 px-8 py-3 transition-all relative group",
                isActive 
                  ? "text-primary-container font-bold" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                />
              )}
              <item.icon className={cn("w-5 h-5", isActive && "text-primary-container")} />
              <span className="font-headline tracking-tight text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-8 border-t border-white/5 space-y-4">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-4 px-2 py-2 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-headline">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-4 px-2 py-2 text-on-surface-variant hover:text-on-surface transition-colors text-sm font-headline">
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-white/5">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/20">
            <img 
              src="https://picsum.photos/seed/cyberpunk/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Curator_01</p>
            <p className="text-[10px] text-on-surface-variant opacity-70 truncate">Premium Tier</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
