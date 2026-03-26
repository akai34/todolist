"use client"

import { Gift, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Reward } from "@/lib/types"

interface RewardCardProps {
  reward: Reward
  currentPoints: number
  onRedeem: (id: string) => void
}

export function RewardCard({ reward, currentPoints, onRedeem }: RewardCardProps) {
  const canAfford = currentPoints >= reward.points

  return (
    <Card className="group overflow-hidden transition-all hover:border-primary/50">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 text-accent">
            <Gift className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
            <Coins className="h-4 w-4" />
            <span>{reward.points}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-foreground">{reward.name}</h3>
          {reward.description && (
            <p className="text-sm text-muted-foreground">{reward.description}</p>
          )}
        </div>
        <Button
          className="w-full"
          variant={canAfford ? "default" : "secondary"}
          disabled={!canAfford}
          onClick={() => onRedeem(reward.id)}
        >
          {canAfford ? "兑换" : "积分不足"}
        </Button>
      </CardContent>
    </Card>
  )
}
