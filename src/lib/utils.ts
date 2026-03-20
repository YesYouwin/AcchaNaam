import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type View = 'dashboard' | 'notes' | 'reminders' | 'editor';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'Ideas' | 'Personal' | 'Work';
  date: string;
  pinned?: boolean;
  progress?: number;
  collaborators?: number;
}

export interface Reminder {
  id: string;
  title: string;
  due: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  overdue?: boolean;
  completed?: boolean;
}

export const MOCK_NOTES: Note[] = [
  {
    id: '882-FX',
    title: 'Architectural patterns for the 2025 biosphere habitat',
    content: 'The focus should remain on organic integration between hardware and biological synthesis. We need to explore the "breathing" facade textures using bioluminescent algae colonies...',
    category: 'Ideas',
    date: '12m ago',
    pinned: true,
    collaborators: 3
  },
  {
    id: 'synth-beats',
    title: 'Idea: Sleep-cycle synth beats',
    content: 'Create a playlist that modulates tempo based on biometric data from the Neuro-Link. Start at 60bpm and...',
    category: 'Ideas',
    date: '2h ago'
  },
  {
    id: 'grocery',
    title: 'Grocery Log',
    content: 'Synthetic Protein Blocks, Hydration Salts (Pack of 12)',
    category: 'Personal',
    date: 'Yesterday'
  },
  {
    id: 'refactor',
    title: 'System Refactor: Node V4',
    content: 'Migrate all existing thought-blobs to the new vector database. Priority: High.',
    category: 'Work',
    date: '1h ago',
    pinned: true,
    progress: 65
  }
];

export const MOCK_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    title: 'Submit quarterly memory shards',
    due: 'Overdue • 2h ago',
    category: 'Work',
    priority: 'High',
    overdue: true
  },
  {
    id: 'rem-2',
    title: 'System maintenance protocol',
    due: 'Today • 11:45 PM',
    category: 'Work',
    priority: 'High'
  },
  {
    id: 'rem-3',
    title: 'Coffee with the AI ghost',
    due: 'Tomorrow • 09:00 AM',
    category: 'Personal',
    priority: 'Medium'
  },
  {
    id: 'rem-4',
    title: 'Renew neural uplink subscription',
    due: 'May 24',
    category: 'Work',
    priority: 'Low'
  },
  {
    id: 'rem-5',
    title: 'Refill synthetic hydration canisters',
    due: 'Completed yesterday',
    category: 'Personal',
    priority: 'Medium',
    completed: true
  }
];
