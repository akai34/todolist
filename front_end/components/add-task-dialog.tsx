"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/lib/store"
import type { TaskType, TimeSlot } from "@/lib/types"

export function AddTaskDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<TaskType>("once")
  const [points, setPoints] = useState("10")
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("morning")
  const addTask = useAppStore((state) => state.addTask)

  const handleSubmit = () => {
    if (!name.trim()) return

    addTask({
      name: name.trim(),
      description: description.trim() || undefined,
      type,
      points: parseInt(points) || 10,
      timeSlot,
    })

    // Reset form
    setName("")
    setDescription("")
    setType("once")
    setPoints("10")
    setTimeSlot("morning")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          添加任务
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加新任务</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">任务名称</Label>
            <Input
              id="name"
              placeholder="输入任务名称..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">任务说明（可选）</Label>
            <Textarea
              id="description"
              placeholder="输入任务说明..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={2}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>任务类型</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as TaskType)}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="once" id="once" />
                <Label htmlFor="once" className="font-normal cursor-pointer">
                  一次性
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="repeat" id="repeat" />
                <Label htmlFor="repeat" className="font-normal cursor-pointer">
                  重复
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="timeSlot">时间段</Label>
            <Select value={timeSlot} onValueChange={(v) => setTimeSlot(v as TimeSlot)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">上午</SelectItem>
                <SelectItem value="afternoon">下午</SelectItem>
                <SelectItem value="evening">晚上</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="points">积分值</Label>
            <Input
              id="points"
              type="number"
              min="1"
              max="100"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              取消
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={!name.trim()}>
              保存
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
