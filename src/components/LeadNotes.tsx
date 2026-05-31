'use client';

import { useState } from 'react';
import { saveLeadNote } from '@/app/actions/lead';
import { Loader2 } from 'lucide-react';

export default function LeadNotes({ leadId, existingNotes }: { leadId: string, existingNotes: any[] }) {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      await saveLeadNote(leadId, content);
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Internal Notes</h2>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
        {existingNotes.map((note) => (
          <div key={note.id} className="bg-background p-4 rounded-xl border border-border">
            <p className="whitespace-pre-wrap text-sm">{note.content}</p>
            <p className="text-xs text-muted mt-2">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {existingNotes.length === 0 && (
          <p className="text-muted text-sm italic">No internal notes yet.</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="e.g. Interested in Website + Automation. Budget around $2000"
          className="w-full bg-background border border-border rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-primary outline-none resize-none"
        />
        <button
          onClick={handleSave}
          disabled={saving || !content.trim()}
          className="bg-primary text-background font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Note Instantly
        </button>
      </div>
    </div>
  );
}
