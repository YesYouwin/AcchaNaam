import React from 'react';
import { MOCK_REMINDERS, cn } from '../lib/utils';
import { Clock, Tag, Calendar as CalendarIcon, Bolt, Check, Trash2, Sparkles, Zap } from 'lucide-react';

export const RemindersView: React.FC = () => {
  return (
    <section className="flex-1 px-24 py-12 max-w-6xl w-full">
      <div className="mb-16">
        <h2 className="font-headline text-5xl font-bold tracking-tighter text-on-surface mb-2">Reminders</h2>
        <p className="font-sans text-on-surface-variant text-sm">Syncing with your subconscious flow.</p>
      </div>

      <div className="space-y-12">
        {/* Immediate Focus */}
        <div>
          <h3 className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
            Immediate Focus
          </h3>
          <div className="space-y-4">
            {MOCK_REMINDERS.filter(r => r.overdue || r.priority === 'High').map(reminder => (
              <div key={reminder.id} className="group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-container-low flex items-center gap-6 border-l-2 border-primary/50">
                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" className="peer appearance-none w-6 h-6 border-2 border-primary/30 rounded-lg checked:bg-primary checked:border-primary transition-all focus:ring-0 bg-transparent" />
                  <Check className="absolute opacity-0 peer-checked:opacity-100 text-on-primary w-4 h-4 left-1" />
                </label>
                <div className="flex-1">
                  <h4 className="font-headline text-lg font-medium text-on-surface group-hover:text-primary transition-colors">{reminder.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={cn("font-sans text-xs flex items-center gap-1", reminder.overdue ? "text-error" : "text-primary")}>
                      <Clock className="w-3.5 h-3.5" />
                      {reminder.due}
                    </span>
                    <span className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      {reminder.category}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div>
          <h3 className="font-headline text-xs font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
            Upcoming
          </h3>
          <div className="space-y-0 relative">
            <div className="absolute left-[2.45rem] top-0 bottom-0 w-[1px] bg-outline-variant/20 z-0" />
            {MOCK_REMINDERS.filter(r => !r.overdue && r.priority !== 'High').map(reminder => (
              <div key={reminder.id} className={cn("group relative flex items-center gap-6 py-6 border-b border-outline-variant/10", reminder.completed && "opacity-40")}>
                <label className="relative flex items-center cursor-pointer z-10">
                  <input 
                    type="checkbox" 
                    checked={reminder.completed}
                    className="peer appearance-none w-6 h-6 border-2 border-outline-variant rounded-lg checked:bg-secondary checked:border-secondary transition-all focus:ring-0 bg-surface" 
                  />
                  <Check className="absolute opacity-0 peer-checked:opacity-100 text-on-secondary w-4 h-4 left-1" />
                </label>
                <div className="flex-1">
                  <h4 className={cn("font-headline text-md font-medium text-on-surface group-hover:text-secondary transition-colors", reminder.completed && "line-through")}>
                    {reminder.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {reminder.due}
                    </span>
                  </div>
                </div>
                {reminder.category === 'Personal' && !reminder.completed && (
                  <span className="px-2 py-0.5 rounded-md bg-surface-container-high text-[10px] text-secondary font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(205,189,255,0.1)]">
                    Personal
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bento Meta Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 p-6 rounded-3xl bg-surface-container-low border border-white/5 flex flex-col justify-between aspect-square md:aspect-auto">
          <div>
            <Zap className="w-6 h-6 text-primary mb-4" />
            <h5 className="font-headline text-xl font-bold text-on-surface">Efficiency Pulse</h5>
          </div>
          <p className="text-3xl font-headline font-bold text-primary">84%</p>
          <p className="text-xs text-on-surface-variant">Tasks completed this cycle</p>
        </div>
        <div className="col-span-1 md:col-span-2 p-8 rounded-3xl bg-surface-container-low border border-white/5 overflow-hidden relative min-h-[160px]">
          <div className="relative z-10">
            <h5 className="font-headline text-xl font-bold text-on-surface mb-2">Upcoming Focus Window</h5>
            <p className="text-on-surface-variant text-sm max-w-xs">Your peak cognitive state is predicted for 10:00 PM tonight. 3 high-priority tasks scheduled.</p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute right-8 top-8 opacity-20">
            <Sparkles className="w-24 h-24 text-on-surface-variant" />
          </div>
        </div>
      </div>
    </section>
  );
};
