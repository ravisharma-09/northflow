import { prisma } from '@/lib/prisma';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { saveTemplate, deleteTemplate } from '@/app/actions/email';
import TemplateSender from '@/components/TemplateSender';

export default async function EmailsPage() {
  const [templates, leads] = await Promise.all([
    prisma.emailTemplate.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="p-8 font-sans max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Mail className="w-8 h-8" /> Email Center
        </h1>
        <p className="text-muted mt-2">Manage your automated sequences and prebuilt templates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Creator */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Create Template</h2>
            <form action={async (formData) => {
              'use server';
              await saveTemplate(
                formData.get('name') as string,
                formData.get('subject') as string,
                formData.get('body') as string
              );
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Template Name (Internal)</label>
                  <input type="text" name="name" required placeholder="e.g. Thank You - V1" className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Email Subject</label>
                  <input type="text" name="subject" required placeholder="Subject line..." className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Email Body</label>
                  <textarea name="body" required placeholder="Type your message here..." className="w-full bg-background border border-border rounded-xl p-4 min-h-[200px] outline-none focus:ring-2 focus:ring-primary resize-y" />
                </div>
                <button type="submit" className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Save Template
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Saved Templates List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Saved Templates ({templates.length})</h2>
          
          {templates.map((template) => (
            <div key={template.id} className="bg-surface border border-border rounded-2xl p-6 shadow-sm group hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-lg text-foreground">{template.name}</h3>
                  <p className="text-sm font-bold text-primary mt-1">Subject: {template.subject}</p>
                </div>
                <form action={async () => {
                  'use server';
                  await deleteTemplate(template.id);
                }}>
                  <button type="submit" className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete Template">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>
              <div className="bg-background border border-border rounded-xl p-4">
                <p className="text-sm text-muted whitespace-pre-wrap">{template.body}</p>
              </div>
            </div>
          ))}

          {templates.length === 0 && (
            <div className="text-center p-12 bg-surface border border-border rounded-2xl border-dashed">
              <Mail className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
              <p className="font-bold text-foreground">No Templates Found</p>
              <p className="text-sm text-muted">Create your first email template to speed up your workflow.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Send Section */}
      <TemplateSender templates={templates} leads={leads} />

    </div>
  );
}
