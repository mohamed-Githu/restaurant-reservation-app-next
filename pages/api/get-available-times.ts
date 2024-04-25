import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../app/db";
import { getTimeOptions } from "@/app/utils/reservations";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, date } = req.query as {
    slug: string;
    date: string;
  };

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      open_time: true,
      close_time: true,
      max_reservations_number: true,
    },
  });

  const bookings = await prisma.booking.findMany({
    where: {
      restaurant: {
        slug: slug,
      },
      booking_date: {
        contains: date,
      },
    },
    select: {
      booking_time: true,
    },
  });

  if (!bookings.length && restaurant) {
    const options = getTimeOptions(restaurant.open_time, restaurant.close_time);

    return res.json(options);
  }

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const { max_reservations_number, open_time, close_time } = restaurant;
  const options = getTimeOptions(open_time, close_time);

  const bookedTimes = bookings.map((booking) => {
    return booking.booking_time;
  });

  const bookedTimesFrequency: Record<string, number> = bookedTimes.reduce(
    (acc: any, time: any) => {
      if (acc[time]) {
        acc[time] += 1;
      } else {
        acc[time] = 1;
      }

      return acc;
    },
    {}
  );

  const allTimes: Record<string, number> = options.reduce(
    (acc, option) => ({
      ...acc,
      [option]: max_reservations_number,
    }),
    {}
  );

  for (const key of Object.keys(bookedTimesFrequency)) {
    if (bookedTimesFrequency[key] >= max_reservations_number) {
      delete allTimes[key];
    }
  }

  return res.json(Object.keys(allTimes));
}
