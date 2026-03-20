import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

function formatRelativeTime(dateInput: string | Date) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const diffMs = Date.now() - date.getTime();

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function normalizeCategory(category: unknown): 'Ideas' | 'Personal' | 'Work' {
  const c = String(category ?? '').trim();
  if (c === 'Personal') return 'Personal';
  if (c === 'Work') return 'Work';
  return 'Ideas';
}

export default async function handler(req: any, res: any) {
  try {
    const clientIdHeader = req?.headers?.['x-client-id'];
    const clientId = Array.isArray(clientIdHeader) ? clientIdHeader[0] : clientIdHeader;

    if (!clientId || typeof clientId !== 'string') {
      return res.status(400).json({ error: 'Missing x-client-id header' });
    }

    const supabase = getSupabaseAdmin();

    if (req.method === 'GET') {
      const limitRaw = req?.query?.limit;
      const limit = Math.max(1, Math.min(100, Number(limitRaw ?? 20)));

      const { data, error } = await supabase
        .from('notes')
        .select('id,title,content,category,pinned,progress,collaborators,updated_at')
        .eq('client_id', clientId)
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) return res.status(500).json({ error: error.message });

      const notes =
        data?.map((row: any) => ({
          id: String(row.id),
          title: String(row.title ?? ''),
          content: String(row.content ?? ''),
          category: normalizeCategory(row.category),
          pinned: Boolean(row.pinned),
          progress: row.progress === null || row.progress === undefined ? undefined : Number(row.progress),
          collaborators: row.collaborators === null || row.collaborators === undefined ? undefined : Number(row.collaborators),
          date: formatRelativeTime(row.updated_at)
        })) ?? [];

      return res.status(200).json({ notes });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});

      const title = String(body?.title ?? '').trim();
      const content = String(body?.content ?? '').trim();
      const category = normalizeCategory(body?.category);

      if (!content) {
        return res.status(400).json({ error: 'Missing content' });
      }

      const { data, error } = await supabase
        .from('notes')
        .insert({
          client_id: clientId,
          title: title || 'Untitled',
          content,
          category,
          pinned: false,
          progress: null,
          collaborators: 0,
          updated_at: new Date().toISOString()
        })
        .select('id,title,content,category,pinned,progress,collaborators,updated_at')
        .single();

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({
        note: {
          id: String(data!.id),
          title: String(data!.title ?? ''),
          content: String(data!.content ?? ''),
          category: normalizeCategory(data!.category),
          pinned: Boolean(data!.pinned),
          progress: data!.progress === null || data!.progress === undefined ? undefined : Number(data!.progress),
          collaborators:
            data!.collaborators === null || data!.collaborators === undefined ? undefined : Number(data!.collaborators),
          date: formatRelativeTime(data!.updated_at)
        }
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message ?? 'Unknown error' });
  }
}

