"use client"
import { Input } from "./input"
import { FormControl } from "./form"

interface TimePickerProps {
  onChange: (value: string) => void
}

export function TimePicker({ onChange }: TimePickerProps) {
  return (
    <FormControl>
      <Input
        type="time"
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  )
}
