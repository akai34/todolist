"use client"

import { Check, Trash2, RotateCcw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"

interface TaskCardProps {
  task: Task
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50",
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => !task.completed && onComplete(task.id)}
          disabled={task.completed}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
            task.completed
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/40 hover:border-primary hover:bg-primary/10"
          )}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-medium text-foreground",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.name}
            </span>
            <Badge
              variant={task.type === "repeat" ? "secondary" : "outline"}
              className="text-xs"
            >
              {task.type === "repeat" ? (
                <span className="flex items-center gap-1">
                  <RotateCcw className="h-3 w-3" />
                  重复
                </span>
              ) : (
                "一次性"
              )}
            </Badge>
          </div>
          {task.description && (
            <span className="text-sm text-muted-foreground">
              {task.description}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-accent">
          <Zap className="h-4 w-4" />
          <span className="font-semibold">{task.points}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
