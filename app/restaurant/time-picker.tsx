"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface TimePickerProps {
  inputName: string;
  pending: boolean;
  optionsLoading: boolean;
  options: string[];
}

export function TimePicker({
  inputName,
  pending,
  optionsLoading,
  options,
}: TimePickerProps): React.ReactNode {
  const [value, onChange] = useState<string>("");

  return (
    <ScrollArea className={options.length > 18 || optionsLoading ? "h-60" : ""}>
      {optionsLoading && (
        <div className="bg-gray-400/5 size-full absolute top-0 left-0 flex items-center justify-center z-50">
          <Loader2 className="animate-spin size-8 bg-transparent" />
        </div>
      )}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-3"
        disabled={pending}
      >
        <input type="hidden" name={inputName} value={value} required readOnly />
        {options.map((option: string) => (
          <ToggleGroupItem
            disabled={pending}
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
