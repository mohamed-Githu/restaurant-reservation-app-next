import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";

interface StarsProps {
  rating?: number;
}

export default function Stars({ rating }: StarsProps): React.ReactNode {
  const fullStarsCount = rating ? Math.floor(rating) : 0;
  const emptyStarsCount = rating ? 5 - Math.ceil(rating) : 5;
  const halfStarsCount = 5 - (fullStarsCount + emptyStarsCount);

  return (
    <div className="flex text-yellow-500 text-xl">
      {Array.from(Array(fullStarsCount)).map((_, i) => (
        <MdStar key={`full-star-${i}`} />
      ))}
      {Array.from(Array(halfStarsCount)).map((_, i) => (
        <MdStarHalf key={`half-star-${i}`} />
      ))}
      {Array.from(Array(emptyStarsCount)).map((_, i) => (
        <MdStarBorder key={`empty-star-${i}`} />
      ))}
    </div>
  );
}
