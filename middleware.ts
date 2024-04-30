import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/restaurant")) {
    const romeTimeZone = "Europe/Rome";
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: romeTimeZone,
    });
    const formattedDate = format(currentDate, "yyyy-MM-dd");

    if (!req.nextUrl.searchParams.has("date")) {
      req.nextUrl.searchParams.set("date", formattedDate);
      return NextResponse.redirect(req.nextUrl);
    }

    const dateQueryParam = req.nextUrl.searchParams.get("date");
    const date: Date = new Date(dateQueryParam || new Date());
    const now: Date = new Date();
    now.setHours(0, 0, 0, 0);

    if (date < now) {
      req.nextUrl.searchParams.set("date", formattedDate);
      return NextResponse.redirect(req.nextUrl);
    }

    return NextResponse.next();
  }
}
