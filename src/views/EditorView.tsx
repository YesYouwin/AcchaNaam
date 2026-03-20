import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bold, Italic, Link, List, Quote, Image, Bell, Calendar, Tag, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { createNote, getLatestNote, updateNote } from '../lib/notesApi';

export const EditorView: React.FC = () => {
  const initialTitle = 'Reflections on Synthetic Oceans';
  const initialContent = `The water in the Neo-Pacific isn't exactly water. It's a bio-luminescent coolant that mimics the viscosity of the old world's oceans. Sitting here at the edge of the Archive, watching the neon pulses ripple through the deep obsidian surface, one can't help but feel the weight of what we've digitized.

Every note stored here is a fragment of a memory that no longer has a physical anchor. We are the curators of the ethereal.

Reminders for the coming cycle:
- Calibrate the atmospheric filters in Sector 7.
- Sync the neural backups with the lunar array.
- Find a way to describe the smell of rain to those who have only known synthetic mist.

The silence here is profound. It’s not the absence of sound, but the presence of focus. In this digital sanctuary, the frantic noise of the mesh network fades into a low hum, leaving only the clarity of thought. We are building a library for the future, one that doesn't rely on paper or silicon, but on the pure intent of the human mind captured in light.`;

  const [noteId, setNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const didInitRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const latest = await getLatestNote();
        if (cancelled) return;

        if (latest) {
          setNoteId(latest.id);
          setTitle(latest.title);
          setContent(latest.content);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const wordCount = useMemo(() => {
    const parts = content.split(/\s+/).map((s) => s.trim()).filter(Boolean);
    return parts.length;
  }, [content]);

  useEffect(() => {
    if (isLoading) return;
    if (!didInitRef.current) {
      didInitRef.current = true;
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setIsSaving(true);

        const payload = {
          title,
          content,
          category: 'Ideas' as const
        };

        const saved = noteId ? await updateNote(noteId, payload) : await createNote(payload);
        setNoteId(saved.id);
        setLastSavedAt(Date.now());
      } catch (err) {
        // Keep editor usable even if save fails (e.g., API not reachable in dev).
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, [title, content, noteId, isLoading]);

  const autoSaveLabel = useMemo(() => {
    if (!lastSavedAt) return 'Auto-save: --';
    const diffMinutes = Math.max(0, Math.round((Date.now() - lastSavedAt) / 60000));
    if (diffMinutes <= 1) return `Auto-save: ${diffMinutes <= 0 ? 'Just now' : '1m ago'}`;
    return `Auto-save: ${diffMinutes}m ago`;
  }, [lastSavedAt]);

  return (
    <div className="flex-1 flex flex-col items-center px-6 lg:px-24 pt-12 pb-32">
      <div className="w-full max-w-4xl relative group">
        {/* Floating Toolbar */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-surface-container-highest/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-50">
          <div className="flex items-center px-2 gap-1 border-r border-white/10">
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><Bold className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><Italic className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><Link className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center px-2 gap-1 border-r border-white/10">
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><List className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><Quote className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center px-2 gap-1">
            <button className="p-2 hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors"><Image className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-secondary transition-colors"><Bell className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Recessed Canvas */}
        <div className="bg-surface-container-lowest/40 backdrop-blur-sm rounded-[2rem] p-12 lg:p-20 shadow-inner border border-white/5">
          <input
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="w-full bg-transparent border-none focus:ring-0 font-headline text-5xl font-bold tracking-tight text-on-surface placeholder:text-on-surface/20 mb-12"
          />

          <div className="flex items-center gap-4 mb-12 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full text-[10px] uppercase tracking-widest font-bold">
              <Calendar className="w-3 h-3" />
              <span>October 24, 2024</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] uppercase tracking-widest font-bold">
              <Tag className="w-3 h-3" />
              <span>Cyber-Ecology</span>
            </div>
            <span className="text-xs font-sans">{wordCount.toLocaleString()} words</span>
          </div>

          <article className="prose prose-invert max-w-none">
            <textarea
              className="w-full h-[600px] bg-transparent border-none focus:ring-0 text-xl leading-[2.2] text-on-surface/80 font-sans placeholder:text-on-surface/10 resize-none custom-scrollbar"
              placeholder="Start your transmission..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
            />
          </article>
        </div>

        {/* Footer Context */}
        <div className="mt-8 flex justify-between items-center text-on-surface/30 text-xs font-sans tracking-wide px-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#00daf3]" /> 
              Cloud Synced
            </span>
            <span>
              {isSaving ? 'Saving...' : autoSaveLabel}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="hover:text-primary transition-colors flex items-center gap-1">
              <MoreHorizontal className="w-3.5 h-3.5" /> More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
