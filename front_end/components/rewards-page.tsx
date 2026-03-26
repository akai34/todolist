"use client"

import { useAppStore } from "@/lib/store"
import { RewardCard } from "./reward-card"
import { PointsDisplay } from "./points-display"
import { toast } from "sonner"

export function RewardsPage() {
  const { rewards, totalPoints, redeemReward } = useAppStore()

  const handleRedeem = (id: string) => {
    const reward = rewards.find((r) => r.id === id)
    if (reward) {
      const success = redeemReward(id)
      if (success) {
        toast.success(`成功兑换「${reward.name}」！`)
      } else {
        toast.error("积分不足，无法兑换")
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">奖励</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            用积分兑换心仪的奖励吧
          </p>
        </div>
        <PointsDisplay size="lg" />
      </div>

      {/* Rewards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            currentPoints={totalPoints}
            onRedeem={handleRedeem}
          />
        ))}
      </div>

      {rewards.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">暂无可用奖励</p>
        </div>
      )}
    </div>
  )
}
