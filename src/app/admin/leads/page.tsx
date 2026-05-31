import { prisma } from '@/lib/prisma';
import LeadRow from '@/components/LeadRow';

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
                <LeadRow key={lead.id} lead={lead} />
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
