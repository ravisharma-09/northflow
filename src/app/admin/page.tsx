import { prisma } from '@/lib/prisma';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const [totalLeads, newLeads, wonDeals] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'New' } }),
    prisma.lead.count({ where: { status: 'Won' } }),
  ]);

  const allLeads = await prisma.lead.findMany();
  const pipelineValue = allLeads.reduce((sum, lead) => sum + (lead.dealValue || 0), 0);
  const closedRevenue = allLeads.filter(l => l.status === 'Won').reduce((sum, lead) => sum + (lead.finalValue || 0), 0);

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

      {/* Activity Feed and Upcoming Meetings will go here in Phase 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface border border-border rounded-2xl p-6 min-h-[400px]">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="flex items-center justify-center h-full text-muted">
            Activity feed coming in Phase 2...
          </div>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 min-h-[400px]">
          <h2 className="text-xl font-bold mb-4">Upcoming Meetings</h2>
          <div className="flex items-center justify-center h-full text-muted">
            Meetings feed coming in Phase 2...
          </div>
        </div>
      </div>
    </div>
  );
}
