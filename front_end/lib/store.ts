"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task, Reward, Goal, LongTermTask } from "./types"

interface AppState {
  // Points
  totalPoints: number
  addPoints: (points: number) => void
  spendPoints: (points: number) => boolean

  // Tasks
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "completed" | "createdAt">) => void
  completeTask: (id: string) => void
  deleteTask: (id: string) => void

  // Rewards
  rewards: Reward[]
  redeemReward: (id: string) => boolean

  // Goals
  currentGoal: Goal | null
  longTermTasks: LongTermTask[]
  completeLongTermTask: (id: string) => void
}

const initialTasks: Task[] = [
  {
    id: "1",
    name: "完成晨间锻炼",
    description: "30分钟有氧运动",
    points: 20,
    type: "repeat",
    completed: false,
    timeSlot: "morning",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "阅读30分钟",
    points: 15,
    type: "repeat",
    completed: false,
    timeSlot: "afternoon",
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "整理工作邮件",
    description: "处理未读邮件",
    points: 10,
    type: "once",
    completed: false,
    timeSlot: "morning",
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "学习新技能",
    description: "完成一个教程章节",
    points: 25,
    type: "once",
    completed: false,
    timeSlot: "evening",
    createdAt: new Date(),
  },
]

const initialRewards: Reward[] = [
  {
    id: "1",
    name: "看一集电视剧",
    description: "休闲放松时间",
    points: 30,
  },
  {
    id: "2",
    name: "购买一杯咖啡",
    description: "犒劳自己一杯好咖啡",
    points: 50,
  },
  {
    id: "3",
    name: "游戏时间1小时",
    description: "畅玩喜欢的游戏",
    points: 80,
  },
  {
    id: "4",
    name: "周末外出聚餐",
    description: "和朋友享受美食",
    points: 150,
  },
]

const initialGoal: Goal = {
  id: "1",
  name: "养成健康的生活习惯",
  description: "坚持30天，建立稳定的作息和运动习惯",
  progress: 12,
  targetProgress: 30,
}

const initialLongTermTasks: LongTermTask[] = [
  {
    id: "1",
    name: "完成晨间锻炼",
    goalId: "1",
    completedCount: 12,
    targetCount: 30,
  },
  {
    id: "2",
    name: "每日阅读",
    goalId: "1",
    completedCount: 8,
    targetCount: 30,
  },
  {
    id: "3",
    name: "早睡早起",
    goalId: "1",
    completedCount: 15,
    targetCount: 30,
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      totalPoints: 120,
      tasks: initialTasks,
      rewards: initialRewards,
      currentGoal: initialGoal,
      longTermTasks: initialLongTermTasks,

      addPoints: (points) =>
        set((state) => ({ totalPoints: state.totalPoints + points })),

      spendPoints: (points) => {
        const state = get()
        if (state.totalPoints >= points) {
          set({ totalPoints: state.totalPoints - points })
          return true
        }
        return false
      },

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now().toString(),
              completed: false,
              createdAt: new Date(),
            },
          ],
        })),

      completeTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id)
          if (task && !task.completed) {
            return {
              tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, completed: true } : t
              ),
              totalPoints: state.totalPoints + task.points,
            }
          }
          return state
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      redeemReward: (id) => {
        const state = get()
        const reward = state.rewards.find((r) => r.id === id)
        if (reward && state.totalPoints >= reward.points) {
          set({ totalPoints: state.totalPoints - reward.points })
          return true
        }
        return false
      },

      completeLongTermTask: (id) =>
        set((state) => {
          const updatedTasks = state.longTermTasks.map((t) =>
            t.id === id ? { ...t, completedCount: t.completedCount + 1 } : t
          )
          const completedCounts = updatedTasks.map((t) => t.completedCount)
          const avgProgress =
            completedCounts.reduce((a, b) => a + b, 0) / completedCounts.length
          return {
            longTermTasks: updatedTasks,
            currentGoal: state.currentGoal
              ? { ...state.currentGoal, progress: Math.floor(avgProgress) }
              : null,
          }
        }),
    }),
    {
      name: "task-rewards-storage",
    }
  )
)
