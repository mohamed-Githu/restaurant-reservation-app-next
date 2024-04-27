"use client";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeopleCountInput from "./people-count-input";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useParams, useSearchParams } from "next/navigation";

interface ReservationViewFormProps {
  restaurantId: number;
  maxSeatsNumber: number;
  minSeatsNumber: number;
}

export default function ReservationViewForm({
  restaurantId,
  maxSeatsNumber,
  minSeatsNumber,
}: ReservationViewFormProps): JSX.Element {
  const params = useParams();
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const { user } = useContext(AuthContext);
  const [options, setOptions] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setOptionsLoading(true);
      const res = await fetch(
        `/api/get-available-times?slug=${params?.slug}&date=${searchParams?.get(
          "date"
        )}`,
        { cache: "no-store" }
      );
      const availableTimes = await res.json();
      setOptions(availableTimes);
      setOptionsLoading(false);
    };

    fetchAvailableTimes();
  }, [searchParams?.get("date")]);

  return (
    <>
      <input hidden name="restaurant_id" value={restaurantId} readOnly />
      <CardHeader className="xs:px-4">
        <CardTitle>Make a reservation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 xs:px-4">
        <PeopleCountInput
          inputName="peopleCount"
          maxValue={maxSeatsNumber}
          minValue={minSeatsNumber}
          pending={pending}
        />
        <Separator />
        <DatePicker inputName="date" pending={pending} />
        <Separator />
        <TimePicker
          inputName="time"
          pending={pending}
          optionsLoading={optionsLoading}
          options={options}
        />
      </CardContent>
      <CardFooter className="xs:px-4">
        {!user ? (
          <p className="text-sm text-center text-muted-foreground mx-auto">
            You need to be logged in to make a reservation!
          </p>
        ) : options.length === 0 && !optionsLoading ? (
          <p className="text-sm text-center text-muted-foreground mx-auto">
            There are no available bookings for the selected day!
          </p>
        ) : !optionsLoading ? (
          <Button
            disabled={pending}
            form="reservation-form"
            type="submit"
            className="w-full"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reserve
          </Button>
        ) : null}
      </CardFooter>
    </>
  );
}
