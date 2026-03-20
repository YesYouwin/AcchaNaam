import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './views/DashboardView';
import { NotesView } from './views/NotesView';
import { RemindersView } from './views/RemindersView';
import { EditorView } from './views/EditorView';
import { type View } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, Edit3, Plus } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'notes':
        return <NotesView />;
      case 'reminders':
        return <RemindersView />;
      case 'editor':
        return <EditorView />;
      default:
        return <DashboardView />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'notes': return 'Memory Stream';
      case 'reminders': return 'Chronos';
      case 'editor': return 'Ethereal';
      default: return 'The Archive';
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30 overflow-x-hidden">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="ml-64 min-h-screen flex flex-col relative">
        <TopBar title={getTitle()} />
        
        <div className="flex-1 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full flex flex-col"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Ambient Glow Decorations */}
        <div className="fixed -bottom-20 -right-20 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed -top-40 -left-40 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        {/* Floating Action Button */}
        <div className="fixed bottom-12 right-12 flex flex-col items-end gap-4 z-50 group">
          {activeView === 'dashboard' && (
            <div className="bg-surface-container-highest px-4 py-2 rounded-xl text-xs font-medium text-secondary shadow-lg border border-secondary/20 flex items-center gap-3 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#cdbdff]" />
              Pulse: Sync Neural Backup
            </div>
          )}
          
          <button 
            onClick={() => setActiveView('editor')}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary flex items-center justify-center shadow-[0_10px_30px_rgba(0,229,255,0.4)] hover:scale-110 transition-transform duration-300 active:scale-95"
          >
            {activeView === 'reminders' ? (
              <Plus className="w-8 h-8" />
            ) : activeView === 'dashboard' ? (
              <Edit3 className="w-8 h-8" />
            ) : (
              <Bolt className="w-8 h-8 fill-current" />
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
