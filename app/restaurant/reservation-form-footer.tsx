"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export default function ReservationFormFooter() {
  const { user } = useContext(AuthContext);

  return (
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
  );
}
