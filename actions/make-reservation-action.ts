"use server";

import { makeReservationSchema } from "@/components/auth/zod-schemas";
import { verifyTokenAction } from "./user-actions";
import prisma from "@/app/db";
import { redirect } from "next/navigation";

export async function makeReservationAction(
  restaurant_id: number,
  peopleCount: number,
  date: string,
  time: string
) {
  try {
    const data = {
      restaurant_id,
      peopleCount,
      date,
      time,
    };

    // Verify user token
    const userVerification = await verifyTokenAction();
    if (!userVerification.success) {
      return {
        status: 401,
        success: false,
        error: "Unauthorized",
      };
    }

    // Validate reservation data
    const result = makeReservationSchema.safeParse(data);
    if (!result.success) {
      return {
        status: 400,
        success: false,
        error: result.error,
      };
    }

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: data.restaurant_id,
      },
      select: {
        max_reservations_number: true,
      },
    });

    // Check if restaurant is fully booked
    const restaurantBookings = await prisma.booking.findMany({
      where: {
        restaurant_id: data.restaurant_id,
        booking_date: data.date,
        booking_time: data.time,
      },
    });

    if (
      restaurant?.max_reservations_number &&
      restaurantBookings.length >= restaurant.max_reservations_number
    ) {
      return {
        status: 400,
        success: false,
        error: "Restaurant is fully booked for the selected date and time",
      };
    }

    // Make reservation
    await prisma.booking.create({
      data: {
        number_of_people: data.peopleCount as number,
        booking_date: data.date as string,
        booking_time: data.time as string,
        user_id: userVerification?.user?.id as number,
        restaurant_id: data.restaurant_id as number,
      },
    });

    
    redirect("/profile");
    return {
      status: 200,
      success: true,
      message: "Reservation made successfully",
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      error: "Internal server error",
    };
  }
}
