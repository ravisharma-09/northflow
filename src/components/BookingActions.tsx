'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cancelBooking, rescheduleBooking } from '@/app/actions/lead';

export default function BookingActions({ leadId, currentStart }: { leadId: string, currentStart: Date }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState('');

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel this booking? This will instantly delete the Google Calendar event and email the client.')) return;
    setLoading(true);
    try {
      await cancelBooking(leadId);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to cancel');
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!newDate) return;
    setLoading(true);
    try {
      const iso = new Date(newDate).toISOString();
      await rescheduleBooking(leadId, iso);
      setShowReschedule(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Failed to reschedule');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center mt-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>;
  }

  if (showReschedule) {
    return (
      <div className="mt-4 space-y-4 bg-background p-4 rounded-xl border border-border shadow-sm">
        <div>
          <label className="block text-sm font-bold text-foreground mb-1.5">Select New Date & Time</label>
          <input 
            type="datetime-local" 
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-base font-medium outline-none focus:border-foreground transition-colors" 
          />
        </div>
        <div className="flex gap-3">
          <button onClick={handleReschedule} className="flex-1 bg-foreground text-background text-sm font-bold py-2.5 rounded-xl hover:scale-[1.02] transition-transform">
            Confirm Reschedule
          </button>
          <button onClick={() => setShowReschedule(false)} className="px-4 py-2.5 text-sm font-bold text-muted hover:bg-surface border border-transparent hover:border-border rounded-xl transition-all">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-4">
      <button 
        onClick={() => setShowReschedule(true)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-background border border-border text-foreground text-sm font-bold rounded-xl hover:border-primary/50 transition-colors"
      >
        <CalendarIcon className="w-4 h-4" /> Reschedule
      </button>
      <button 
        onClick={handleCancel}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 text-red-500 text-sm font-bold rounded-xl hover:bg-red-500/20 transition-colors"
      >
        <X className="w-4 h-4" /> Cancel
      </button>
    </div>
  );
}
