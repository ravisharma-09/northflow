import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { Mail, MessageSquare, ExternalLink } from 'lucide-react';

export default async function AdminDashboard() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">NorthFlow Command Center</h1>
        <p className="text-muted mb-10">Manage your discovery calls and leads.</p>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface/50 border-b border-border">
                <th className="p-4 font-semibold text-muted text-sm uppercase tracking-wider">Lead Info</th>
                <th className="p-4 font-semibold text-muted text-sm uppercase tracking-wider">Business & Services</th>
                <th className="p-4 font-semibold text-muted text-sm uppercase tracking-wider">Meeting Time</th>
                <th className="p-4 font-semibold text-muted text-sm uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-muted text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface/30 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-foreground">{lead.name}</p>
                    <p className="text-sm text-muted">{lead.email}</p>
                    <p className="text-sm text-muted">{lead.whatsapp}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{lead.businessName || 'N/A'}</p>
                    <p className="text-sm text-muted truncate max-w-[200px]">{lead.services || 'None selected'}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-primary">{format(new Date(lead.meetingStart), 'MMM d, yyyy')}</p>
                    <p className="text-sm text-muted">{format(new Date(lead.meetingStart), 'h:mm a')}</p>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase rounded-full tracking-wider border border-primary/20">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <a href={`mailto:${lead.email}`} className="p-2 bg-surface rounded-lg hover:bg-border transition-colors group" title="Send Email">
                      <Mail className="w-5 h-5 text-muted group-hover:text-foreground" />
                    </a>
                    {lead.whatsapp && (
                      <a href={`https://wa.me/${lead.whatsapp.replace(/\\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-surface rounded-lg hover:bg-green-500/20 transition-colors group" title="WhatsApp Message">
                        <MessageSquare className="w-5 h-5 text-muted group-hover:text-green-500" />
                      </a>
                    )}
                    {lead.meetLink && (
                      <a href={lead.meetLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-primary text-background rounded-lg hover:scale-105 transition-transform" title="Join Google Meet">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-muted">
                    No leads found. Start sharing your booking link!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
