"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TodayTasks } from "./today-tasks"
import { RewardsPage } from "./rewards-page"
import { GoalsPage } from "./goals-page"
import { BottomNav } from "./bottom-nav"
import { DesktopSidebar } from "./desktop-sidebar"

type TabType = "today" | "goals" | "rewards"

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabType>("today")

  const renderContent = () => {
    switch (activeTab) {
      case "today":
        return <TodayTasks />
      case "goals":
        return <GoalsPage />
      case "rewards":
        return <RewardsPage />
      default:
        return <TodayTasks />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header for sub-pages */}
      {activeTab !== "today" && (
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setActiveTab("today")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">
            {activeTab === "goals" ? "目标" : "奖励"}
          </h1>
        </header>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 lg:flex lg:gap-8 lg:pb-6">
        {/* Left Column - Main Content */}
        <main className="flex-1">{renderContent()}</main>

        {/* Right Column - Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <DesktopSidebar onNavigate={setActiveTab} />
          </div>
        </aside>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
