import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Providers from "@/components/Providers";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session as any).error === 'UserDeleted') {
      redirect("/login");
    }

    return (
      <Providers>
        <div className="flex min-h-screen bg-background">
          <AdminSidebar user={session.user} />
          <main className="flex-1 pb-20">
            {children}
          </main>
        </div>
      </Providers>
    );
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') throw error;
    return (
      <div className="p-8 bg-background min-h-screen">
        <h1 className="text-red-500 text-3xl font-bold mb-4">Layout Render Error</h1>
        <pre className="bg-red-500/10 p-4 rounded-lg text-red-500 font-mono whitespace-pre-wrap">
          {error.message}{'\n'}{error.stack}
        </pre>
      </div>
    );
  }
}
