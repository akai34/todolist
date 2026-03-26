import { AppShell } from "@/components/app-shell"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <>
      <AppShell />
      <Toaster position="top-center" richColors />
    </>
  )
}
