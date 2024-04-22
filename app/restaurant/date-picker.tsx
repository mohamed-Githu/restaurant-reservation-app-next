"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface DatePickerProps {
  inputName: string;
}

export function DatePicker({ inputName }: DatePickerProps): React.ReactNode {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex items-center text-gray-700 justify-between">
      <Label htmlFor="date" className="text-nowrap mr-8">
        Pick a date
      </Label>
      <input
        type="hidden"
        value={format(date || new Date(Date.now()), "yyyy-MM-dd")}
        name={inputName}
        required
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-56 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
          <Input
            type="date"
            value={date?.toLocaleDateString()}
            hidden
            name="date"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
