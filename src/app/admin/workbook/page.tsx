'use client';

import { ExternalLink, Info } from 'lucide-react';

export default function WorkbookPage() {
  const embedUrl = process.env.NEXT_PUBLIC_OUTREACH_SHEET_EMBED_URL;
  const openUrl = process.env.NEXT_PUBLIC_OUTREACH_SHEET_OPEN_URL;

  return (
    <div className="flex flex-col h-full h-[calc(100vh-2rem)] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Outreach Workbook</h1>
          <p className="text-muted mt-1 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            All changes are saved directly to the NorthFlow Outreach Workbook.
          </p>
        </div>
        {openUrl && (
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center gap-2 shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
            Open in Google Sheets
          </a>
        )}
      </div>

      <div className="flex-1 bg-surface border border-border rounded-[24px] overflow-hidden shadow-sm flex flex-col relative">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full border-0 absolute inset-0"
            title="NorthFlow Outreach Workbook"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <p className="text-lg font-bold text-muted mb-2">Workbook URLs not configured</p>
            <p className="text-sm text-muted/70 max-w-md">
              Please set NEXT_PUBLIC_OUTREACH_SHEET_EMBED_URL and NEXT_PUBLIC_OUTREACH_SHEET_OPEN_URL in your environment variables.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
