'use client';

import { useState } from 'react';
import { Loader2, Send, Users } from 'lucide-react';
import { sendTemplateToLeads } from '@/app/actions/email';

export default function TemplateSender({ templates, leads }: { templates: any[], leads: any[] }) {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLeadToggle = (id: string) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
  };

  const selectAll = () => setSelectedLeads(leads.map(l => l.id));
  const deselectAll = () => setSelectedLeads([]);

  const handleSend = async () => {
    if (!selectedTemplate || selectedLeads.length === 0) return;
    setSending(true);
    setSuccessMsg('');
    try {
      await sendTemplateToLeads(selectedTemplate, selectedLeads);
      setSelectedLeads([]);
      setSuccessMsg(`Successfully sent to ${selectedLeads.length} leads!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to send emails. Check configuration.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Send className="w-5 h-5" /> Send Template to Clients</h2>
      <p className="text-sm text-muted mb-6">Select a template and choose which clients should receive it. You can use placeholders like <code className="bg-background px-1 py-0.5 rounded">{{name}}</code>, <code className="bg-background px-1 py-0.5 rounded">{{businessName}}</code>, and <code className="bg-background px-1 py-0.5 rounded">{{meetLink}}</code> in your templates.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Template Selection */}
        <div>
          <label className="block text-sm text-muted mb-2 font-bold">1. Select Template</label>
          <select 
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary mb-4"
          >
            <option value="" disabled>Choose a saved template...</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name} (Subj: {t.subject})</option>
            ))}
          </select>

          {selectedTemplate && (
            <div className="bg-background border border-border rounded-xl p-4 text-sm mt-4">
              <p className="font-bold mb-2 text-primary">Template Preview:</p>
              <p className="whitespace-pre-wrap text-muted">{templates.find(t => t.id === selectedTemplate)?.body}</p>
            </div>
          )}
        </div>

        {/* Lead Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm text-muted font-bold">2. Select Recipients ({selectedLeads.length} selected)</label>
            <div className="flex gap-2">
              <button onClick={selectAll} className="text-xs text-primary hover:underline">Select All</button>
              <button onClick={deselectAll} className="text-xs text-muted hover:underline">Clear</button>
            </div>
          </div>
          
          <div className="bg-background border border-border rounded-xl max-h-[250px] overflow-y-auto divide-y divide-border">
            {leads.map(lead => (
              <label key={lead.id} className="flex items-center gap-3 p-3 hover:bg-surface/50 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleLeadToggle(lead.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-background"
                />
                <div>
                  <p className="font-bold text-sm text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted">{lead.email} &bull; {lead.status}</p>
                </div>
              </label>
            ))}
            {leads.length === 0 && <p className="p-4 text-center text-sm text-muted">No leads available.</p>}
          </div>
        </div>

      </div>

      <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
        <p className="text-sm font-bold text-green-500">{successMsg}</p>
        <button
          onClick={handleSend}
          disabled={sending || !selectedTemplate || selectedLeads.length === 0}
          className="py-3 px-8 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          Send to {selectedLeads.length} Client{selectedLeads.length !== 1 ? 's' : ''}
        </button>
      </div>

    </div>
  );
}
