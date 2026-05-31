'use client';

import { useState } from 'react';
import { updateLeadValue } from '@/app/actions/lead';
import { Loader2, DollarSign } from 'lucide-react';

export default function DealValueEditor({ lead }: { lead: any }) {
  const [dealValue, setDealValue] = useState(lead.dealValue?.toString() || '0');
  const [finalValue, setFinalValue] = useState(lead.finalValue?.toString() || '0');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateLeadValue(lead.id, parseFloat(dealValue), parseFloat(finalValue));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Revenue Tracking</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-muted mb-1">Expected Pipeline Value</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
            <input 
              type="number" 
              value={dealValue} 
              onChange={(e) => setDealValue(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-muted mb-1">Final Closed Revenue</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
            <input 
              type="number" 
              value={finalValue} 
              onChange={(e) => setFinalValue(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        disabled={saving || (parseFloat(dealValue) === lead.dealValue && parseFloat(finalValue) === lead.finalValue)}
        className="w-full py-2 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        Update Values
      </button>
    </div>
  );
}
