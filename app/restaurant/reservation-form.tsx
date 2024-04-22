"use client";

import PeopleCountInput from "./people-count-input";
import { DatePicker } from "./date-picker";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getTimeOptions } from "../utils/reservations";
import { TimePicker } from "./time-picker";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

interface ReservationFormProps {
  className?: string;
  openTime: string;
  closeTime: string;
}

export default function ReservationForm({
  className,
  openTime,
  closeTime,
}: ReservationFormProps): JSX.Element {
  const options = getTimeOptions(openTime, closeTime);
  const { user } = useContext(AuthContext);

  return (
    <Card className={className}>
      <form action="" id="reservation-form">
        <CardHeader>
          <CardTitle>Make a reservation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <PeopleCountInput
            inputName="peopleCount"
            maxValue={12}
            minValue={1}
          />
          <Separator />
          <DatePicker inputName="date" />
          <Separator />
          <TimePicker inputName="time" options={options} />
        </CardContent>
        <CardFooter>
          {!user ? (
            <p className="text-sm text-center text-muted-foreground">
              You need to be logged in to make a reservation!
            </p>
          ) : (
            <Button form="reservation-form" type="submit" className="w-full">
              Reserve
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
