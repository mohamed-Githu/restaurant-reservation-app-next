import PeopleCountInput from "./people-count-input";
import { DatePicker } from "./date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TimePicker } from "./time-picker";
import ReservationFormFooter from "./reservation-form-footer";

interface ReservationFormProps {
  className?: string;
  maxSeatsNumber: number;
  minSeatsNumber: number;
}

export default function ReservationForm({
  className,
  maxSeatsNumber,
  minSeatsNumber,
}: ReservationFormProps): React.ReactNode {
  return (
    <Card className={className}>
      <form action="" id="reservation-form">
        <CardHeader>
          <CardTitle>Make a reservation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <PeopleCountInput
            inputName="peopleCount"
            maxValue={maxSeatsNumber}
            minValue={minSeatsNumber}
          />
          <Separator />
          <DatePicker inputName="date" />
          <Separator />
          <TimePicker inputName="time" />
        </CardContent>
        <ReservationFormFooter />
      </form>
    </Card>
  );
}
