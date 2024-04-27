"use client";

import { useState } from "react";
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";

interface ReviewStarsProps {
  inputName: string;
}

export default function ReviewStars({
  inputName,
}: ReviewStarsProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="flex items-center text-2xl text-amber-500">
      <input name={inputName} value={rating} readOnly hidden />
      {Array.from(Array(5)).map((_, index) => {
        const ratingValue = index + 1;

        return (
          <button
            key={`star-${index}`}
            type="button"
            onClick={() => setRating(ratingValue)}
            className="focus:outline-none"
          >
            {ratingValue <= rating ? <MdStar /> : <MdStarBorder />}
          </button>
        );
      })}
    </div>
  );
}
