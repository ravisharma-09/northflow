'use client';

import { useState } from 'react';
import { sendCustomEmail } from '@/app/actions/email';
import { Loader2, Send, Mail } from 'lucide-react';

export default function EmailComposer({ leadId, templates }: { leadId: string, templates: any[] }) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tmpl = templates.find(t => t.id === e.target.value);
    if (tmpl) {
      setSubject(tmpl.subject);
      setBody(tmpl.body);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    setSuccessMsg('');
    try {
      await sendCustomEmail(leadId, subject, body);
      setSubject('');
      setBody('');
      setSuccessMsg('Email sent successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to send email. Check configuration.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Mail className="w-5 h-5" /> Send Email</h2>
      
      {templates.length > 0 && (
        <div className="mb-4">
          <select 
            onChange={handleTemplateChange}
            defaultValue=""
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            <option value="" disabled>Select a pre-built template...</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Subject" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary font-bold"
        />
        <textarea 
          placeholder="Type your email message..." 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full bg-background border border-border rounded-xl p-4 min-h-[150px] outline-none focus:ring-2 focus:ring-primary resize-y"
        />
        
        {successMsg && <p className="text-green-500 font-bold text-sm">{successMsg}</p>}

        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !body.trim()}
          className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send Email Now
        </button>
      </div>
    </div>
  );
}
