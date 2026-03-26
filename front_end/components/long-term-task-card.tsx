"use client"

import { Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { LongTermTask } from "@/lib/types"

interface LongTermTaskCardProps {
  task: LongTermTask
  onComplete: (id: string) => void
}

export function LongTermTaskCard({ task, onComplete }: LongTermTaskCardProps) {
  const progress = (task.completedCount / task.targetCount) * 100
  const isCompleted = task.completedCount >= task.targetCount

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">{task.name}</span>
          <span className="text-sm text-muted-foreground">
            {task.completedCount}/{task.targetCount}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <button
        onClick={() => !isCompleted && onComplete(task.id)}
        disabled={isCompleted}
        className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 hover:border-primary hover:bg-primary/10"
        }`}
      >
        {isCompleted && <Check className="h-4 w-4" />}
      </button>
    </div>
  )
}
