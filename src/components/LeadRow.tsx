import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { updateLeadStatus } from '@/app/actions/lead';
import { useRouter } from 'next/navigation';

const STATUSES = [
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost'
];

export default function LeadRow({ lead }: { lead: any }) {
  const [status, setStatus] = useState(lead.status);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setUpdating(true);
    try {
      await updateLeadStatus(lead.id, newStatus);
    } catch (err) {
      console.error(err);
      setStatus(lead.status); // Revert on error
    } finally {
      setUpdating(false);
    }
  };

  return (
    <tr className="hover:bg-surface/30 transition-colors group">
      <td className="p-4 cursor-pointer" onClick={() => router.push(`/admin/leads/${lead.id}`)}>
        <p className="font-bold text-foreground group-hover:underline">{lead.name}</p>
        <p className="text-sm text-muted">{lead.email}</p>
        <p className="text-sm text-muted">{lead.whatsapp}</p>
      </td>
      <td className="p-4">
        <p className="font-semibold">{lead.businessName || 'N/A'}</p>
        <p className="text-sm text-muted truncate max-w-[200px]" title={lead.services}>{lead.services || 'None selected'}</p>
      </td>
      <td className="p-4">
        <p className="font-semibold text-primary">{format(new Date(lead.meetingStart), 'MMM d, yyyy')}</p>
        <p className="text-sm text-muted">{format(new Date(lead.meetingStart), 'h:mm a')}</p>
      </td>
      <td className="p-4">
        <div className="relative">
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
            className={`appearance-none px-3 py-1.5 pr-8 bg-surface border rounded-full text-xs font-bold uppercase tracking-wider outline-none cursor-pointer transition-colors ${
              status === 'Won' ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10' :
              status === 'Lost' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
              status === 'New' ? 'border-blue-500/50 text-blue-500 bg-blue-500/10' :
              'border-border text-foreground hover:border-foreground/30'
            }`}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {updating && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-muted" />}
        </div>
      </td>
      <td className="p-4 flex items-center gap-3">
        <a href={`mailto:${lead.email}`} className="p-2 bg-surface rounded-lg hover:bg-border transition-colors" title="Send Email">
          <Mail className="w-5 h-5 text-muted hover:text-foreground" />
        </a>
        {lead.whatsapp && (
          <a href={`https://wa.me/${lead.whatsapp.replace(/\\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface rounded-lg hover:bg-green-500/20 transition-colors" title="WhatsApp Message">
            <MessageSquare className="w-5 h-5 text-muted hover:text-green-500" />
          </a>
        )}
        {lead.meetLink && (
          <a href={lead.meetLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary text-background rounded-lg hover:scale-105 transition-transform" title="Join Google Meet">
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </td>
    </tr>
  );
}
