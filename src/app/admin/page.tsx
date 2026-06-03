import { prisma } from '@/lib/prisma';
import { Users, Calendar, DollarSign, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fmtShort = (d: Date) => new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
}).format(d);

export default async function AdminDashboard() {
  const [totalLeads, newLeads, wonDeals] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'New' } }),
    prisma.lead.count({ where: { status: 'Won' } }),
  ]);

  const allLeads = await prisma.lead.findMany();
  const pipelineValue = allLeads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0);
  const closedRevenue = allLeads.filter(l => l.status === 'Won').reduce((sum, lead) => sum + (lead.finalValue || 0), 0);

  const recentActivities = await prisma.leadActivity.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { lead: true }
  });

  const upcomingLeads = await prisma.lead.findMany({
    where: { meetingStart: { gte: new Date() }, status: { notIn: ['Lost'] } },
    orderBy: { meetingStart: 'asc' },
    take: 5
  });

  const kpis = [
    { label: 'Total Leads', value: totalLeads, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'New Leads', value: newLeads, icon: Users, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Won Deals', value: wonDeals, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Pipeline Value', value: `$${pipelineValue.toLocaleString()}`, icon: DollarSign, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Revenue Closed', value: `$${closedRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="p-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted">Welcome to NorthFlow CRM V2.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kpi.bg}`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-muted uppercase tracking-wider">{kpi.label}</p>
                <p className="text-3xl font-black text-foreground mt-1">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface border border-border rounded-2xl p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="space-y-6">
            {recentActivities.map(activity => (
              <div key={activity.id} className="relative pl-6 border-l-2 border-primary/20">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                <p className="font-medium text-sm">
                  <Link href={`/admin/leads/${activity.leadId}`} className="hover:underline font-bold text-foreground">
                    {activity.lead.name}
                  </Link>
                  {' - '}{activity.action}
                </p>
                <p className="text-xs text-muted mt-1">{fmtShort(new Date(activity.createdAt))}</p>
              </div>
            ))}
            {recentActivities.length === 0 && <p className="text-muted text-sm">No recent activity.</p>}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Meetings</h2>
            <Link href="/admin/bookings" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingLeads.map(lead => (
              <Link key={lead.id} href={`/admin/leads/${lead.id}`} className="block p-4 rounded-xl border border-border hover:border-primary transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted">{lead.businessName || lead.services}</p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg whitespace-nowrap">
                    {fmtShort(new Date(lead.meetingStart))}
                  </span>
                </div>
              </Link>
            ))}
            {upcomingLeads.length === 0 && <p className="text-muted text-sm">No upcoming meetings.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
