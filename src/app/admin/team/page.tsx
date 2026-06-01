import { prisma } from '@/lib/prisma';
import { Users, Shield, UserPlus, Trash2, Plus } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { inviteTeamMember, removeTeamMember } from '@/app/actions/team';
import { format } from 'date-fns';
import SubmitButton from '@/components/SubmitButton';

export default async function TeamPage() {
  const session = await getServerSession(authOptions);
  
  if ((session?.user as any)?.role !== 'ADMIN') {
    redirect('/admin'); // Kick non-admins out
  }

  const team = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Users className="w-8 h-8" /> Team Management
        </h1>
        <p className="text-muted mt-2">Whitelist email addresses to grant access to the CRM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Invite User Card */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm sticky top-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserPlus className="w-5 h-5" /> Invite Team Member</h2>
            <form action={async (formData) => {
              'use server';
              await inviteTeamMember(
                formData.get('email') as string,
                formData.get('role') as string
              );
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Google Email Address</label>
                  <input type="email" name="email" required placeholder="e.g. member@northflow.com" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
                  <p className="text-xs text-muted mt-1">They will log in instantly using Google Sign-In.</p>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Role</label>
                  <select name="role" required className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary">
                    <option value="MEMBER">Member (Read/Write CRM)</option>
                    <option value="ADMIN">Admin (Full System Access)</option>
                  </select>
                </div>
                <SubmitButton 
                  icon={<Plus className="w-5 h-5" />}
                  className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02]"
                >
                  Send Invite
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>

        {/* Team List */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-background/50">
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">User</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Role</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider">Joined</th>
                  <th className="p-4 text-xs font-bold text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {team.map((user) => (
                  <tr key={user.id} className="hover:bg-background/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img src={user.image} alt={user.name || ''} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                            {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-foreground">{user.name || 'Pending Login'}</p>
                          <p className="text-sm text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {user.role === 'ADMIN' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider rounded-full">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                          Member
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted">
                      {format(new Date(user.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4 text-right">
                      {user.email !== process.env.GOOGLE_CALENDAR_ID && (
                        <form action={async () => {
                          'use server';
                          await removeTeamMember(user.id);
                        }}>
                          <SubmitButton 
                            icon={<Trash2 className="w-5 h-5" />}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                          />
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
