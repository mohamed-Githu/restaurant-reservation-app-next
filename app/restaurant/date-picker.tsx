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
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DatePickerProps {
  inputName: string;
  pending: boolean;
}

export function DatePicker({
  inputName,
  pending,
}: DatePickerProps): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState<Date>(
    new Date(searchParams?.get("date") || Date.now())
  );

  const handleDateChange = (date: any) => {
    setDate(date);
    router.push(
      `${pathname}?date=${format(date || new Date(Date.now()), "yyyy-MM-dd")}`,
      {
        scroll: false,
      }
    );
    triggerButtonRef.current?.click();
  };

  return (
    <div className="flex items-center text-gray-700 justify-between">
      <Label htmlFor="date" className="text-nowrap mr-8">
        Pick a date
      </Label>
      <input
        type="text"
        hidden
        value={format(date, "yyyy-MM-dd")}
        name={inputName}
        required
        readOnly
      />
      <Popover>
        <PopoverTrigger disabled={pending} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-56 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            ref={triggerButtonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            disabled={{ before: new Date(Date.now()) }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
