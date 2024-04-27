import { verifyTokenAction } from "@/actions/user-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const res = await verifyTokenAction();
  if (!res.success) {
    redirect("/");
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl uppercase font-extrabold text-center mb-5">
          {res.user?.firstname} {res.user?.lastname}
        </CardTitle>
        <CardDescription className="flex flex-col">
          <span>Email: {res.user?.email}</span>
          <span>Phone: {res.user?.phone}</span>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <CardTitle className="my-4">Bookings</CardTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
          {res.user?.bookings ? (
            res.user?.bookings.map((booking) => (
              <Card className="shadow-none" key={booking.id}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/restaurant/${booking.restaurant.slug}`} className="hover:underline">
                      {booking.restaurant.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {booking.booking_date} at {booking.booking_time}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center">
              You have no bookings!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
