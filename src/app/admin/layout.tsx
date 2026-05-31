import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Providers from "@/components/Providers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
