"use client";

import { Card } from "@/components/ui/card";
import { makeReservationAction } from "@/actions/make-reservation-action";
import { makeReservationSchema } from "@/components/auth/zod-schemas";
import { useToast } from "@/components/ui/use-toast";
import ReservationViewForm from "./reservation-view-form";

interface ReservationFormProps {
  className?: string;
  maxSeatsNumber: number;
  minSeatsNumber: number;
  restaurantId: number;
}

export default function ReservationView({
  className,
  maxSeatsNumber,
  minSeatsNumber,
  restaurantId,
}: ReservationFormProps): React.ReactNode {
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    const data = {
      peopleCount: parseInt(formData.get("peopleCount") as string),
      date: formData.get("date") as string,
      time: formData.get("time") as string,
    };

    const zodResult = makeReservationSchema.safeParse(data);

    if (!zodResult.success) {
      let errorMessage = "";

      for (const [key, value] of Object.entries(
        zodResult.error.flatten().fieldErrors
      )) {
        errorMessage += `\n${key.toUpperCase()}:\n${value.join("\n")}\n`;
      }

      console.log(errorMessage);
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });

      return;
    }

    const res: any = await makeReservationAction(
      restaurantId,
      data.peopleCount,
      data.date,
      data.time
    );

    if (res.success) {
      toast({
        variant: "success",
        title: "Booking completed successfully!",
        description: `You have successfully booked a table for ${data.peopleCount} people.\nDate: ${data.date} at ${data.time}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: res.error,
      });
    }
  };

  return (
    <Card className={className}>
      <form action={handleSubmit} id="reservation-form">
        <ReservationViewForm
          maxSeatsNumber={maxSeatsNumber}
          minSeatsNumber={minSeatsNumber}
          restaurantId={restaurantId}
        />
      </form>
    </Card>
  );
}
