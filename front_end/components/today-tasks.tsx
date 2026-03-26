"use client"

import { Sun, Cloud, Moon } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { TaskCard } from "./task-card"
import { AddTaskDialog } from "./add-task-dialog"
import { PointsDisplay } from "./points-display"
import type { TimeSlot } from "@/lib/types"
import { toast } from "sonner"

const timeSlotConfig: Record<TimeSlot, { label: string; icon: React.ReactNode }> = {
  morning: { label: "上午", icon: <Sun className="h-4 w-4" /> },
  afternoon: { label: "下午", icon: <Cloud className="h-4 w-4" /> },
  evening: { label: "晚上", icon: <Moon className="h-4 w-4" /> },
}

function formatDate() {
  const now = new Date()
  const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  const month = now.getMonth() + 1
  const date = now.getDate()
  const day = days[now.getDay()]
  return { dateStr: `${month}月${date}日`, dayStr: day }
}

export function TodayTasks() {
  const { tasks, completeTask, deleteTask } = useAppStore()
  const { dateStr, dayStr } = formatDate()

  const handleComplete = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      completeTask(id)
      toast.success(`完成任务，获得 ${task.points} 积分！`)
    }
  }

  const handleDelete = (id: string) => {
    deleteTask(id)
    toast.info("任务已删除")
  }

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const slot = task.timeSlot || "morning"
      if (!acc[slot]) acc[slot] = []
      acc[slot].push(task)
      return acc
    },
    {} as Record<TimeSlot, typeof tasks>
  )

  const completedCount = tasks.filter((t) => t.completed).length
  const totalCount = tasks.length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{dateStr}</span>
            <span>{dayStr}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">今日任务</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            已完成 {completedCount}/{totalCount} 个任务
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PointsDisplay size="lg" />
          <AddTaskDialog />
        </div>
      </div>

      {/* Task Groups */}
      <div className="flex flex-col gap-6">
        {(["morning", "afternoon", "evening"] as TimeSlot[]).map((slot) => {
          const slotTasks = groupedTasks[slot] || []
          if (slotTasks.length === 0) return null
          const config = timeSlotConfig[slot]
          return (
            <div key={slot} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                {config.icon}
                <span className="text-sm font-medium">{config.label}</span>
                <span className="text-xs">
                  ({slotTasks.filter((t) => t.completed).length}/{slotTasks.length})
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {slotTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">暂无任务</p>
          <p className="mt-1 text-sm text-muted-foreground">点击上方按钮添加新任务</p>
        </div>
      )}
    </div>
  )
}
