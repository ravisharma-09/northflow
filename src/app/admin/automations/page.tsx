import { prisma } from '@/lib/prisma';
import { Zap, Plus, Trash2, ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createAutomationRule, deleteAutomationRule } from '@/app/actions/automation';
import SubmitButton from '@/components/SubmitButton';

const STATUSES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'];

export default async function AutomationsPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/admin');

  const [rules, templates] = await Promise.all([
    prisma.automationRule.findMany({ include: { template: true }, orderBy: { createdAt: 'desc' } }),
    prisma.emailTemplate.findMany({ orderBy: { name: 'asc' } })
  ]);

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary" /> Workflow Automations
        </h1>
        <p className="text-muted mt-2">Create custom "If This, Then That" rules for your CRM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rule Builder */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm sticky top-8">
            <h2 className="text-xl font-bold mb-6">Create Rule</h2>
            <form action={async (formData) => {
              'use server';
              await createAutomationRule(
                formData.get('name') as string,
                formData.get('triggerValue') as string,
                formData.get('templateId') as string
              );
            }}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-muted mb-1 font-bold">Rule Name</label>
                  <input type="text" name="name" required placeholder="e.g. Send Proposal" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
                </div>
                
                <div className="p-4 bg-background border border-border rounded-xl">
                  <p className="text-xs text-muted uppercase font-bold tracking-widest mb-2">Trigger (IF)</p>
                  <label className="block text-sm text-foreground mb-1 font-bold">Lead Status changes to:</label>
                  <select name="triggerValue" required className="w-full bg-surface border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary mt-1">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-xs text-primary uppercase font-bold tracking-widest mb-2">Action (THEN)</p>
                  <label className="block text-sm text-foreground mb-1 font-bold">Send Email Template:</label>
                  <select name="templateId" required className="w-full bg-surface border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary mt-1">
                    <option value="" disabled selected>Select a template...</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <SubmitButton 
                  icon={Plus} 
                  className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02]"
                >
                  Activate Rule
                </SubmitButton>
              </div>
            </form>
          </div>
        </div>

        {/* Active Rules List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Active Workflows ({rules.length})</h2>
          
          {rules.map((rule) => (
            <div key={rule.id} className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-black text-lg text-foreground">{rule.name}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold bg-background p-3 rounded-xl border border-border w-max">
                  <span className="text-muted">IF Status = </span>
                  <span className="bg-foreground text-background px-2 py-0.5 rounded">{rule.triggerValue}</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="text-primary">Send Email:</span>
                  <span className="text-foreground">{rule.template?.name || 'Deleted Template'}</span>
                </div>
              </div>
              <form action={async () => {
                'use server';
                await deleteAutomationRule(rule.id);
              }}>
                <SubmitButton 
                  icon={Trash2}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl ml-4" 
                />
              </form>
            </div>
          ))}

          {rules.length === 0 && (
            <div className="text-center p-12 bg-surface border border-border rounded-2xl border-dashed">
              <Zap className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
              <p className="font-bold text-foreground">No Automations Found</p>
              <p className="text-sm text-muted">Create your first rule to put your CRM on autopilot.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
