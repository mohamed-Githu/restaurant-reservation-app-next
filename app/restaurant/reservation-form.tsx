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
  slug: string;
}

export default async function ReservationForm({
  className,
  maxSeatsNumber,
  minSeatsNumber,
  slug,
}: ReservationFormProps): Promise<JSX.Element> {
  // const res = await fetch(
  //   `${process.env.BASE_URL}/api/get-available-times?slug=${slug}`,
  //   { next: { revalidate: 1 } }
  // );

  // const options = await res.json();
  // console.log(options);

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
