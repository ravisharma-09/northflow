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
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  return (
    <Providers>
      <div className="flex h-screen bg-background overflow-hidden font-sans">
        <AdminSidebar user={session.user} />
        <main className="flex-1 overflow-y-auto hide-scrollbar">
          {children}
        </main>
      </div>
    </Providers>
  );
}
