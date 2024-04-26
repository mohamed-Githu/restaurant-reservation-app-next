"use client";

import RestaurantRating from "@/components/restaurant-rating";
import { DoorClosed, DoorOpen } from "lucide-react";
import Image from "next/image";
import { RestaurantDescriptionReview } from "../types/restaurant-types";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import ReviewForm from "./review-form";
import { newReviewSchema } from "@/components/auth/zod-schemas";
import { useToast } from "@/components/ui/use-toast";
import { newReviewAction } from "@/actions/new-review-action";

interface DetailsViewProps {
  name: string;
  description: string;
  images: Array<string>;
  reviews: Array<RestaurantDescriptionReview>;
  openTime: string;
  closeTime: string;
  canReview: boolean;
  children?: React.ReactNode;
}

export default function DetailsView({
  name,
  description,
  images,
  reviews,
  openTime,
  closeTime,
  canReview,
  children,
}: DetailsViewProps): JSX.Element {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const handleReviewSubmit = async (formData: FormData) => {
    const data = {
      slug: formData.get("slug") as string,
      rating: parseInt(formData.get("rating") as string),
      text: formData.get("text") as string,
    };

    // validate data
    const zodResult = newReviewSchema.safeParse(data);

    if (!zodResult.success) {
      let errorMessage = "";

      for (const [key, value] of Object.entries(
        zodResult.error.flatten().fieldErrors
      )) {
        errorMessage += `\n${key.toUpperCase()}:\n${value.join("\n")}\n`;
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });

      return;
    }

    if (user?.id) {
      const res = await newReviewAction(data.slug, data.rating, data.text);

      if (res?.success) {
        toast({
          title: "Review was submitted successfully!",
          variant: "success",
        });
      } else {
        toast({
          title: "An Error Occured!",
          description: res?.error,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="col-span-5 rounded bg-white">
      <h1 className="m-5 font-extrabold text-5xl">{name}</h1>
      <div className="m-5 mb-7 mt-0 space-y-3">
        <RestaurantRating reviews={reviews} />
        <div className="flex items-center *:flex *:items-center text-gray-700 space-x-4">
          <p>
            <DoorOpen className="mr-2" /> {openTime}
          </p>
          <span>-</span>
          <p>
            <DoorClosed className="mr-2" /> {closeTime}
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
      {children}
      {user &&
        (canReview ? (
          <form action={handleReviewSubmit} className="mb-4">
            <ReviewForm />
          </form>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            You already reviewed this restaurant!
          </p>
        ))}
    </div>
  );
}
