"use client"

import { Coins } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

interface PointsDisplayProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PointsDisplay({ className, size = "md" }: PointsDisplayProps) {
  const totalPoints = useAppStore((state) => state.totalPoints)

  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full bg-primary/10 font-semibold text-primary",
        sizeClasses[size],
        className
      )}
    >
      <Coins className={iconSizes[size]} />
      <span>{totalPoints}</span>
    </div>
  )
}
