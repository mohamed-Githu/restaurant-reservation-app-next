"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

interface TimePickerProps {
  inputName: string;
}

export function TimePicker({ inputName }: TimePickerProps): React.ReactNode {
  const params = useParams();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, onChange] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/get-available-times?slug=${params?.slug}&date=${searchParams?.get(
          "date"
        )}`,
        { next: { revalidate: 1 } }
      );
      const availableTimes = await res.json();
      setOptions(availableTimes);
      setIsLoading(false);
    };

    fetchAvailableTimes();
  }, [searchParams?.get("date")]);

  return (
    <ScrollArea className={options.length > 18 || isLoading ? "h-60" : ""}>
      {isLoading && (
        <div className="bg-gray-400/5 size-full absolute top-0 left-0 flex items-center justify-center z-50">
          <Loader2 className="animate-spin size-8 bg-transparent" />
        </div>
      )}
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
