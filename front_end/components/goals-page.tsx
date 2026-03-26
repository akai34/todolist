"use client"

import { Target, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAppStore } from "@/lib/store"
import { LongTermTaskCard } from "./long-term-task-card"
import { toast } from "sonner"

export function GoalsPage() {
  const { currentGoal, longTermTasks, completeLongTermTask } = useAppStore()

  const handleCompleteTask = (id: string) => {
    completeLongTermTask(id)
    toast.success("今日打卡成功，继续加油！")
  }

  const progressPercent = currentGoal
    ? Math.round((currentGoal.progress / currentGoal.targetProgress) * 100)
    : 0

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">目标</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          每天进步一点点，终将达成目标
        </p>
      </div>

      {/* Current Goal Card */}
      {currentGoal && (
        <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{currentGoal.name}</CardTitle>
              {currentGoal.description && (
                <p className="text-sm text-muted-foreground">
                  {currentGoal.description}
                </p>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">进度</span>
              <span className="font-semibold text-primary">
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                第 {currentGoal.progress} 天 / 共 {currentGoal.targetProgress} 天
              </span>
              <span className="flex items-center gap-1 text-primary">
                <TrendingUp className="h-3 w-3" />
                持续进步中
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Long Term Tasks */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">长期任务</h2>
        <div className="flex flex-col gap-3">
          {longTermTasks.map((task) => (
            <LongTermTaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
            />
          ))}
        </div>
      </div>

      {/* Encouragement */}
      <div className="rounded-lg bg-secondary/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          坚持就是胜利，你已经比昨天更好了！
        </p>
      </div>
    </div>
  )
}
