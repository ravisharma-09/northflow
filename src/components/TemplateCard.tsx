'use client';

import { useState } from 'react';
import { Trash2, Edit2, X, Check } from 'lucide-react';
import { updateTemplate, deleteTemplate } from '@/app/actions/email';

export default function TemplateCard({ template }: { template: any }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-surface border border-primary/50 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-lg text-foreground">Edit Template</h3>
          <button onClick={() => setIsEditing(false)} className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form action={async (formData) => {
          await updateTemplate(
            template.id,
            formData.get('name') as string,
            formData.get('subject') as string,
            formData.get('body') as string
          );
          setIsEditing(false);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Template Name</label>
              <input type="text" name="name" defaultValue={template.name} required className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Subject</label>
              <input type="text" name="subject" defaultValue={template.subject} required className="w-full bg-background border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Body</label>
              <textarea name="body" defaultValue={template.body} required className="w-full bg-background border border-border rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-primary resize-y" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-background font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              <Check className="w-5 h-5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm group hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-black text-lg text-foreground">{template.name}</h3>
          <p className="text-sm font-bold text-primary mt-1">Subject: {template.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsEditing(true)} className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors" title="Edit Template">
            <Edit2 className="w-4 h-4" />
          </button>
          <form action={async () => {
            if (confirm('Are you sure you want to delete this template?')) {
              await deleteTemplate(template.id);
            }
          }}>
            <button type="submit" className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Template">
              <Trash2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="bg-background border border-border rounded-xl p-4">
        <p className="text-sm text-muted whitespace-pre-wrap">{template.body}</p>
      </div>
    </div>
  );
}
