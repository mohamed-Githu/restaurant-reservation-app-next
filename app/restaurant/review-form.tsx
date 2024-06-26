"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import ReviewStars from "./review-stars";

export default function ReviewForm(): JSX.Element {
  const params = useParams();
  const { pending } = useFormStatus();

  return (
    <div className="mt-8 mx-4">
      <input type="text" name="slug" value={params?.slug} readOnly hidden />
      <h3 className="text-3xl font-extrabold mb-4">Write a Review</h3>
      <Textarea
        className="resize-none h-40"
        placeholder="Write your review here (maximum 500 characters)"
        name="text"
        maxLength={500}
        disabled={pending}
      />
      <div className="mt-4 flex justify-between items-center text-amber-500">
        <Button type="submit" disabled={pending}>
          {pending && <Loader2 className="animate-spin size-4 mr-2" />} Submit
          Review
        </Button>
        <ReviewStars inputName="rating" />
      </div>
    </div>
  );
}
