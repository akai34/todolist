"use client"

import { Target, Gift, TrendingUp, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

type TabType = "today" | "goals" | "rewards"

interface DesktopSidebarProps {
  onNavigate: (tab: TabType) => void
}

export function DesktopSidebar({ onNavigate }: DesktopSidebarProps) {
  const { totalPoints, currentGoal, rewards } = useAppStore()

  const progressPercent = currentGoal
    ? Math.round((currentGoal.progress / currentGoal.targetProgress) * 100)
    : 0

  const affordableRewards = rewards.filter((r) => totalPoints >= r.points)

  return (
    <div className="flex w-80 flex-col gap-4">
      {/* Points Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Coins className="h-5 w-5 text-primary" />
            总积分
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">{totalPoints}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            可兑换 {affordableRewards.length} 个奖励
          </p>
        </CardContent>
      </Card>

      {/* Goal Quick Info */}
      {currentGoal && (
        <Card
          className="cursor-pointer transition-all hover:border-primary/50"
          onClick={() => onNavigate("goals")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-5 w-5 text-primary" />
              当前目标
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="font-medium text-foreground">{currentGoal.name}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">进度</span>
                <span className="font-semibold text-primary">
                  {progressPercent}%
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span>
                第 {currentGoal.progress} 天 / 共 {currentGoal.targetProgress} 天
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rewards Quick Access */}
      <Card
        className="cursor-pointer transition-all hover:border-primary/50"
        onClick={() => onNavigate("rewards")}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Gift className="h-5 w-5 text-accent" />
            奖励中心
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {affordableRewards.length > 0
              ? `有 ${affordableRewards.length} 个奖励可兑换`
              : "继续努力攒积分吧"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate("rewards")
            }}
          >
            查看奖励
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
