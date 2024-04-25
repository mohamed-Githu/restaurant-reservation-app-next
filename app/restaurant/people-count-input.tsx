"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PeopleCountInputProps {
  inputName: string;
  maxValue: number;
  minValue: number;
  pending: boolean;
}

const PeopleCountInput: React.FC<PeopleCountInputProps> = ({
  inputName,
  maxValue,
  minValue,
  pending,
}) => {
  const [value, onChange] = useState<number>(1);

  const handleIncrement = () => {
    if (value < maxValue) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > minValue) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= minValue && value <= maxValue) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center text-gray-700 justify-between">
      <Label htmlFor={inputName}>Party Size</Label>
      <div className="space-x-5 flex items-center">
        <button type="button" onClick={handleDecrement} disabled={pending}>
          <MinusCircle size={24} />
        </button>
        <Input
          id={inputName}
          name={inputName}
          type="number"
          value={value}
          onChange={handleChange}
          className="w-24"
          disabled={pending}
        />
        <button type="button" onClick={handleIncrement} disabled={pending}>
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default PeopleCountInput;
