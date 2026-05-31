import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-background/50 backdrop-blur-sm min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted font-bold animate-pulse">Loading data...</p>
      </div>
    </div>
  );
}
