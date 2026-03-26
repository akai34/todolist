export type TaskType = "once" | "repeat"

export type TimeSlot = "morning" | "afternoon" | "evening"

export interface Task {
  id: string
  name: string
  description?: string
  points: number
  type: TaskType
  completed: boolean
  timeSlot?: TimeSlot
  createdAt: Date
}

export interface Reward {
  id: string
  name: string
  description?: string
  points: number
}

export interface Goal {
  id: string
  name: string
  description?: string
  progress: number
  targetProgress: number
}

export interface LongTermTask {
  id: string
  name: string
  goalId: string
  completedCount: number
  targetCount: number
}
