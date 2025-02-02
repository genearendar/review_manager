import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/appSidebar";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/dashboard/loader";

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SidebarProvider>
        <aside>
          <AppSidebar />
        </aside>
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </Suspense>
  );
}
