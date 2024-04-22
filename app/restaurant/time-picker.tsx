"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface TimePickerProps {
  options: Array<string>;
  inputName: string;
}

export function TimePicker({
  options,
  inputName,
}: TimePickerProps): React.ReactNode {
  const [value, onChange] = useState<string>("");

  return (
    <ScrollArea className={options.length > 18 ? "h-60" : ""}>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-3"
      >
        <input type="hidden" name={inputName} value={value} required />
        {options.map((option: string) => (
          <ToggleGroupItem
            variant="outline"
            value={option}
            aria-label={`select ${option}`}
            key={option}
          >
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ScrollArea>
  );
}
