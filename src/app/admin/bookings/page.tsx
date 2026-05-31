import { prisma } from '@/lib/prisma';
import { format, isToday, isTomorrow, isThisWeek, isAfter, startOfDay } from 'date-fns';
import { ExternalLink, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import BookingActions from '@/components/BookingActions';

export default async function BookingsPage() {
  const upcomingLeads = await prisma.lead.findMany({
    where: {
      meetingStart: { gte: startOfDay(new Date()) },
      status: { notIn: ['Lost'] }
    },
    orderBy: { meetingStart: 'asc' }
  });

  const today = upcomingLeads.filter(l => isToday(new Date(l.meetingStart)));
  const tomorrow = upcomingLeads.filter(l => isTomorrow(new Date(l.meetingStart)));
  const thisWeek = upcomingLeads.filter(l => !isToday(new Date(l.meetingStart)) && !isTomorrow(new Date(l.meetingStart)) && isThisWeek(new Date(l.meetingStart)));
  const later = upcomingLeads.filter(l => isAfter(new Date(l.meetingStart), new Date()) && !isToday(new Date(l.meetingStart)) && !isTomorrow(new Date(l.meetingStart)) && !isThisWeek(new Date(l.meetingStart)));

  const renderCard = (lead: any) => (
    <div key={lead.id} className="bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Link href={`/admin/leads/${lead.id}`} className="font-bold text-lg hover:underline">{lead.name}</Link>
          <p className="text-sm text-muted font-medium">{lead.businessName || lead.services}</p>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
          {format(new Date(lead.meetingStart), 'h:mm a')}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted mb-4">
        <CalendarIcon className="w-4 h-4" />
        {format(new Date(lead.meetingStart), 'EEEE, MMMM d')}
      </div>
      {lead.meetLink && (
        <a href={lead.meetLink} target="_blank" className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform">
          <ExternalLink className="w-4 h-4" /> Join Meeting
        </a>
      )}
      <BookingActions leadId={lead.id} currentStart={lead.meetingStart} />
    </div>
  );

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">Booking Schedule</h1>

      <div className="space-y-10">
        {today.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" /> Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {today.map(renderCard)}
            </div>
          </section>
        )}

        {tomorrow.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-orange-500 mb-4">Tomorrow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tomorrow.map(renderCard)}
            </div>
          </section>
        )}

        {thisWeek.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Later This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thisWeek.map(renderCard)}
            </div>
          </section>
        )}

        {later.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-muted mb-4">Upcoming</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {later.map(renderCard)}
            </div>
          </section>
        )}

        {upcomingLeads.length === 0 && (
          <div className="text-center p-12 bg-surface border border-border rounded-2xl">
            <CalendarIcon className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground">No Upcoming Meetings</h3>
            <p className="text-muted">Your schedule is completely clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
