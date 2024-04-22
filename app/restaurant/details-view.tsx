"use client";

import RestaurantRating from "@/components/restaurant-rating";
import { DoorClosed, DoorOpen } from "lucide-react";
import Image from "next/image";
import ReviewsList from "./[slug]/reviews-list";
import { RestaurantDescriptionReview } from "../types/restaurant-types";
import { formatTime } from "../utils/reservations";
import { Separator } from "@/components/ui/separator";

interface DetailsViewProps {
  name: string;
  description: string;
  images: Array<string>;
  reviews: Array<RestaurantDescriptionReview>;
  openTime: string;
  closeTime: string;
}

export default function DetailsView({
  name,
  description,
  images,
  reviews,
  openTime,
  closeTime,
}: DetailsViewProps): JSX.Element {
  return (
    <div className="col-span-5 rounded bg-white">
      <h1 className="m-5 font-extrabold text-5xl">{name}</h1>
      <div className="m-5 mb-7 mt-0 space-y-3">
        <RestaurantRating reviews={reviews} />
        <div className="flex items-center *:flex *:items-center text-gray-700 space-x-4">
          <p>
            <DoorOpen className="mr-2" /> {formatTime(openTime)}
          </p>
          <span>-</span>
          <p>
            <DoorClosed className="mr-2" /> {formatTime(closeTime)}
          </p>
        </div>
      </div>
      <Separator />
      <p className="p-4 leading-5">{description}</p>
      <h3 className="text-3xl font-extrabold mt-8 mb-2 mx-4">
        {images.length} Photos
      </h3>
      <Separator />
      <div className="grid grid-cols-3 p-4 gap-1">
        {images.map((image, i) => (
          <Image
            width={400}
            height={400}
            className="object-cover"
            src={image}
            alt={`name - image (${i})`}
            key={`image-${i}`}
          />
        ))}
      </div>
      {reviews.length > 0 && (
        <>
          <h3 className="text-3xl font-extrabold mt-8 mb-2 mx-4">Reviews</h3>
          <Separator />
          <ReviewsList reviews={reviews} />
        </>
      )}
    </div>
  );
}
