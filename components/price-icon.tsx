import { PriceCategoryType } from "@/app/types/restaurant-types";
import { PRICE_CATEGORY } from "@prisma/client";

export default function PriceIcon({
  price_category,
}: PriceCategoryType): React.ReactNode {
  const renderPrice = () => {
    if (price_category === PRICE_CATEGORY.CHEAP) {
      return (
        <>
          <span>$$</span> <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price_category === PRICE_CATEGORY.REGULAR) {
      return (
        <>
          <span>$$$</span> <span className="text-gray-400">$</span>
        </>
      );
    } else {
      return (
        <>
          <span>$$$$</span>
        </>
      );
    }
  };

  return <p className="flex">{renderPrice()}</p>;
}
