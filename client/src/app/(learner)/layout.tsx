import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppNavbar } from "@/components/learner/AppNavbar"
import { NotificationProvider } from "@/contexts/NotificationContext"

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
        <AppNavbar/>
          {children}
        </main>
      </SidebarProvider>
    </NotificationProvider>
  )
}