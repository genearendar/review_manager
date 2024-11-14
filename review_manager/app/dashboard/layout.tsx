import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/appSidebar";

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
    <SidebarProvider>
      <aside>
        <AppSidebar />
      </aside>
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
