"use client"

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PPP") : <span>Pick a date...</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setOpen(false); 
            }}
            disabled={(date) => {
              const day = date.getDay();

              // Disable Fri, Sat, Sun
              const isWeekendRestricted =
                day === 0 || day === 5 || day === 6;

              // Disable past dates
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const isPastDate = date < today;

              return isWeekendRestricted || isPastDate;
            }}
            />
      </PopoverContent>
    </Popover>
  )
}
