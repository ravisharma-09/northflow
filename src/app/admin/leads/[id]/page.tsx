import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Briefcase, Calendar, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import LeadNotes from '@/components/LeadNotes';
import DealValueEditor from '@/components/DealValueEditor';

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
  const lead = await prisma.lead.findUnique({
    where: { id: params.id },
    include: {
      notes: { orderBy: { createdAt: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!lead) return notFound();

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <Link href="/admin/leads" className="flex items-center gap-2 text-muted hover:text-foreground mb-6 w-fit transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Leads
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">{lead.name}</h1>
          <div className="flex items-center gap-4 text-muted">
            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {lead.businessName || 'No Business Name'}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Created {format(new Date(lead.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <span className="px-4 py-2 bg-primary/10 text-primary font-black uppercase tracking-wider rounded-full border border-primary/20">
          {lead.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted mb-1">Email Address</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted" />
                  <a href={`mailto:${lead.email}`} className="font-semibold hover:underline">{lead.email}</a>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">WhatsApp / Phone</p>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted" />
                  {lead.whatsapp ? (
                    <a href={`https://wa.me/${lead.whatsapp.replace(/\\D/g, '')}`} target="_blank" className="font-semibold text-green-500 hover:underline">{lead.whatsapp}</a>
                  ) : <span className="text-muted">N/A</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Meeting Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted mb-1">Scheduled For</p>
                <p className="font-semibold text-primary">{format(new Date(lead.meetingStart), 'EEEE, MMMM d, yyyy')}</p>
                <p className="font-semibold">{format(new Date(lead.meetingStart), 'h:mm a')} - {format(new Date(lead.meetingEnd), 'h:mm a')}</p>
              </div>
              <div>
                <p className="text-sm text-muted mb-1">Google Meet Link</p>
                {lead.meetLink ? (
                  <a href={lead.meetLink} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold rounded-lg hover:scale-105 transition-transform">
                    <ExternalLink className="w-4 h-4" /> Join Meeting
                  </a>
                ) : <span className="text-muted">No link generated</span>}
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted mb-1">Services Requested</p>
                <p className="font-semibold p-4 bg-background rounded-xl border border-border">{lead.services || 'None'}</p>
              </div>
              {lead.message && (
                <div className="col-span-2">
                  <p className="text-sm text-muted mb-1">Client Message</p>
                  <p className="font-medium p-4 bg-background rounded-xl border border-border whitespace-pre-wrap">{lead.message}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Notes & Activity */}
        <div className="space-y-8">
          <DealValueEditor lead={lead} />
          <LeadNotes leadId={lead.id} existingNotes={lead.notes} />
          
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {lead.activities.map((activity) => (
                <div key={activity.id} className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted mt-1">{format(new Date(activity.createdAt), 'MMM d, h:mm a')}</p>
                </div>
              ))}
              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                <p className="font-medium text-sm">Lead Created</p>
                <p className="text-xs text-muted mt-1">{format(new Date(lead.createdAt), 'MMM d, h:mm a')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
