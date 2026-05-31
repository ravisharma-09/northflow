'use client';

import { useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { assignLead } from '@/app/actions/lead';

export default function LeadAssigner({ leadId, currentAssigneeId, team }: { leadId: string, currentAssigneeId: string | null, team: any[] }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAssign = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    try {
      const val = e.target.value;
      await assignLead(leadId, val === 'UNASSIGNED' ? null : val);
    } catch (err) {
      console.error(err);
      alert('Failed to assign lead');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm relative">
      {isUpdating && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5" /> Assigned Team Member</h2>
      <select 
        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-foreground outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
        defaultValue={currentAssigneeId || 'UNASSIGNED'}
        onChange={handleAssign}
        disabled={isUpdating}
      >
        <option value="UNASSIGNED">Unassigned</option>
        {team.map(member => (
          <option key={member.id} value={member.id}>
            {member.name || member.email}
          </option>
        ))}
      </select>
    </div>
  );
}
