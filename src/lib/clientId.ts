const CLIENT_ID_KEY = 'archive_client_id';

export function getClientId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }

  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const newId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `cid_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

  window.localStorage.setItem(CLIENT_ID_KEY, newId);
  return newId;
}

