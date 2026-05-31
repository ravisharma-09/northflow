import { Settings, Shield, Mail, Key } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if ((session?.user as any)?.role !== 'ADMIN') {
    redirect('/admin'); // Boot non-admins back to dashboard
  }

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="w-8 h-8" /> System Settings
        </h1>
        <p className="text-muted mt-2">Manage your CRM configuration and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Shield className="w-5 h-5" /> Admin Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Name</label>
              <input type="text" disabled value={session?.user?.name || ''} className="w-full bg-background border border-border rounded-xl px-4 py-3 opacity-70 cursor-not-allowed font-medium" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Email (Google Auth)</label>
              <input type="text" disabled value={session?.user?.email || ''} className="w-full bg-background border border-border rounded-xl px-4 py-3 opacity-70 cursor-not-allowed font-medium" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Mail className="w-5 h-5" /> Email Engine Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Outgoing Email Address</label>
              <input type="text" disabled value={process.env.GOOGLE_CALENDAR_ID || ''} className="w-full bg-background border border-border rounded-xl px-4 py-3 opacity-70 cursor-not-allowed font-medium" />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Nodemailer Status</label>
              <div className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 rounded-xl px-4 py-3 font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Connected to Gmail App Password
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
