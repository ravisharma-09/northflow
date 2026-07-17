'use client';

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, Key } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let errorMessage = '';
  if (error === 'AccessDenied') {
    errorMessage = 'Unauthorized. Your email has not been whitelisted by an Administrator.';
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'Email already exists with a different provider. Please contact support.';
  } else if (error) {
    errorMessage = 'An error occurred during authentication. Please try again.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface border border-border rounded-[32px] p-10 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Admin Portal</h1>
        <p className="text-muted mb-6">Sign in with your authorized Google Workspace account to access the CRM.</p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-red-500">{errorMessage}</p>
          </div>
        )}
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="w-full py-4 bg-foreground text-background font-bold rounded-full hover:scale-[1.02] transition-transform text-lg flex items-center justify-center gap-3 mb-6"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] bg-border flex-1"></div>
          <span className="text-sm font-medium text-muted uppercase tracking-widest">OR</span>
          <div className="h-[1px] bg-border flex-1"></div>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await signIn("credentials", { password, callbackUrl: "/admin" });
        }}>
          <div className="relative mb-4">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              type="password"
              placeholder="Admin Password Bypass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 bg-surface text-foreground font-bold rounded-xl border border-border hover:bg-background transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Bypass Google Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
