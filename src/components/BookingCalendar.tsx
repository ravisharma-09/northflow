'use client';

import React, { useState, useEffect } from 'react';
import { format, addDays, startOfToday, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Calendar as CalendarIcon, Clock, Globe, ArrowLeft } from 'lucide-react';

export default function BookingCalendar({ formData, onComplete, onBack }: any) {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(today, 1)); // Default to tomorrow
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [userTimezone, setUserTimezone] = useState<string>('UTC');

  // Generate the next 14 days for the horizontal date picker
  const upcomingDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i + 1));

  useEffect(() => {
    // Auto-detect user timezone
    try {
      setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (e) {
      console.error("Could not detect timezone", e);
    }
  }, []);

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const res = await fetch(`/api/calendar/slots?date=${dateStr}`);
        const data = await res.json();
        setAvailableSlots(data.slots || []);
        setSelectedSlot(null); // Reset selected slot when date changes
      } catch (e) {
        console.error("Failed to fetch slots", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSlots();
  }, [selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    try {
      const res = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slot: selectedSlot,
          clientTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setMeetLink(data.meetLink);
        if (onComplete) onComplete(data);
      } else {
        alert(`Booking failed: ${data.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred.");
    } finally {
      setBooking(false);
    }
  };

  // Helper to format ISO string to local time
  const formatLocalTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch {
      return '';
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex flex-col items-center justify-center p-10 text-center"
      >
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-muted mb-8 max-w-lg">
          Your meeting is scheduled. We've sent a calendar invite with the Google Meet link to <span className="text-foreground font-medium">{formData.email}</span>.
        </p>
        {meetLink && (
          <div className="p-6 bg-surface rounded-2xl border border-border flex flex-col items-center gap-3 w-full max-w-md">
            <span className="text-sm font-semibold text-muted uppercase tracking-wider">Google Meet Link</span>
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-foreground hover:underline">
              Join Meeting
            </a>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Header Area */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-2">Select a Time</h2>
          <p className="text-lg text-muted">Choose a slot for your discovery call.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-surface rounded-full border border-border self-center md:self-auto">
          <Globe className="w-4 h-4 text-muted" />
          <span className="text-foreground">Times shown in <span className="font-bold">{userTimezone}</span></span>
        </div>
      </div>

      {/* Horizontal Dates Row */}
      <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
        <div className="flex gap-4 min-w-max">
          {upcomingDays.map((date) => {
            const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center justify-center min-w-[100px] p-5 rounded-[24px] transition-all duration-300 border ${
                  isSelected 
                  ? 'bg-foreground text-background border-foreground shadow-xl scale-105' 
                  : 'bg-surface/30 text-foreground border-border hover:border-foreground/30 hover:bg-surface'
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-background/80' : 'text-muted'}`}>
                  {format(date, 'MMM')}
                </span>
                <span className="text-3xl font-bold mb-1">{format(date, 'dd')}</span>
                <span className={`text-sm font-medium ${isSelected ? 'text-background/90' : 'text-foreground/70'}`}>
                  {format(date, 'EEE')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] w-full bg-border my-6"></div>

      {/* Time Slots Area */}
      <div className="flex flex-col relative min-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-muted" />
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted text-lg">
            No slots available on this day. Please select another.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-24">
            {availableSlots.map((isoString) => {
              const isSelected = selectedSlot === isoString;
              return (
                <button
                  key={isoString}
                  onClick={() => setSelectedSlot(isoString)}
                  className={`py-5 px-4 rounded-[20px] text-lg font-bold transition-all duration-300 border flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-foreground text-background border-foreground shadow-lg scale-105'
                      : 'bg-surface/30 text-foreground border-border hover:border-foreground/40 hover:bg-surface'
                  }`}
                >
                  {formatLocalTime(isoString)}
                </button>
              );
            })}
          </div>
        )}

        {/* Floating Confirm Button */}
        {selectedSlot && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50"
          >
            <button
              onClick={handleBook}
              disabled={booking}
              className="w-full py-5 bg-foreground text-background rounded-full font-bold text-lg shadow-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 border-4 border-background disabled:opacity-70 disabled:hover:scale-100"
            >
              {booking ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  Confirm {formatLocalTime(selectedSlot)} on {format(selectedDate, 'MMM d')}
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
