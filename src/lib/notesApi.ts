import type { Note } from './utils';
import { getClientId } from './clientId';

function handleApiError(res: Response) {
  return res
    .text()
    .catch(() => '')
    .then((text) => {
      const msg = text?.trim() ? text.trim() : `HTTP ${res.status}`;
      throw new Error(msg);
    });
}

export async function listNotes(limit = 50): Promise<Note[]> {
  const clientId = getClientId();
  const res = await fetch(`/api/notes?limit=${encodeURIComponent(String(limit))}`, {
    method: 'GET',
    headers: {
      'x-client-id': clientId
    }
  });

  if (!res.ok) await handleApiError(res);

  const json = (await res.json()) as { notes: Note[] };
  return json.notes;
}

export async function getLatestNote(): Promise<Note | null> {
  const notes = await listNotes(1);
  return notes.length ? notes[0] : null;
}

export async function createNote(input: { title: string; content: string; category: Note['category'] }): Promise<Note> {
  const clientId = getClientId();
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': clientId
    },
    body: JSON.stringify(input)
  });

  if (!res.ok) await handleApiError(res);

  const json = (await res.json()) as { note: Note };
  return json.note;
}

export async function updateNote(
  id: string,
  input: { title: string; content: string; category: Note['category'] }
): Promise<Note> {
  const clientId = getClientId();
  const res = await fetch(`/api/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': clientId
    },
    body: JSON.stringify(input)
  });

  if (!res.ok) await handleApiError(res);

  const json = (await res.json()) as { note: Note };
  return json.note;
}

