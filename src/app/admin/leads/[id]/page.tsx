import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase, Calendar, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import LeadNotes from '@/components/LeadNotes';
import DealValueEditor from '@/components/DealValueEditor';
import EmailComposer from '@/components/EmailComposer';
import LeadAssigner from '@/components/LeadAssigner';

const fmtDate = (d: Date) => new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
}).format(d);
const fmtTime = (d: Date) => new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true,
}).format(d);
const fmtShort = (d: Date) => new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
}).format(d);

export default async function LeadDetailsPage({ params }: { params: { id: string } }) {
  const [lead, templates, team] = await Promise.all([
    prisma.lead.findUnique({
      where: { id: params.id },
      include: {
        notes: { orderBy: { createdAt: 'desc' } },
        activities: { orderBy: { createdAt: 'desc' } }
      }
    }),
    prisma.emailTemplate.findMany({ orderBy: { name: 'asc' } }),
    prisma.user.findMany({ orderBy: { name: 'asc' } })
  ]);

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
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Created {fmtShort(new Date(lead.createdAt))}</span>
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
                <p className="font-semibold text-primary">{fmtDate(new Date(lead.meetingStart))}</p>
                <p className="font-semibold">{fmtTime(new Date(lead.meetingStart))} - {fmtTime(new Date(lead.meetingEnd))}</p>
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
          <LeadAssigner leadId={lead.id} currentAssigneeId={lead.assignedToId} team={team} />
          <EmailComposer leadId={lead.id} templates={templates} />
          <DealValueEditor lead={lead} />
          <LeadNotes leadId={lead.id} existingNotes={lead.notes} />
          
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Activity Timeline</h2>
            <div className="space-y-4">
              {lead.activities.map((activity) => (
                <div key={activity.id} className="relative pl-6 border-l-2 border-primary/20">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted mt-1">{fmtShort(new Date(activity.createdAt))}</p>
                </div>
              ))}
              <div className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                <p className="font-medium text-sm">Lead Created</p>
                <p className="text-xs text-muted mt-1">{fmtShort(new Date(lead.createdAt))}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
