'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import React from 'react';

export default function SubmitButton({ 
  children, 
  className,
  icon: Icon,
  variant = 'primary'
}: { 
  children?: React.ReactNode, 
  className?: string,
  icon?: any,
  variant?: 'primary' | 'danger' | 'ghost'
}) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className || ''}`}
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : (Icon && <Icon className="w-5 h-5" />)}
      {children}
    </button>
  );
}
