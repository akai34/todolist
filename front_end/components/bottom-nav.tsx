"use client"

import { CalendarDays, Target, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "today" | "goals" | "rewards"

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "today", label: "今日", icon: <CalendarDays className="h-5 w-5" /> },
  { id: "goals", label: "目标", icon: <Target className="h-5 w-5" /> },
  { id: "rewards", label: "奖励", icon: <Gift className="h-5 w-5" /> },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
