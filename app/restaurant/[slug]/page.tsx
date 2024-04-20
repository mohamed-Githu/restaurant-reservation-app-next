import { Separator } from "@/components/ui/separator";
import RestaurantMenuBar from "./restaurant-menu-bar";
import { getRestaurantBySlug } from "@/app/utils/restaurants";
import Image from "next/image";
import { Metadata } from "next";
import RestaurantRating from "@/components/restaurant-rating";
import ReviewsList from "./reviews-list";
import { RestaurantDetailsPageProps } from "./types";

export async function generateMetadata({
  params,
}: RestaurantDetailsPageProps): Promise<Metadata> {
  const { slug } = params;
  const { name, description } = await getRestaurantBySlug(slug);

  return {
    title: `BuonAppetito | ${name}`,
    description,
  };
}

export default async function RestaurantDetailsPage({
  params,
}: RestaurantDetailsPageProps): Promise<React.ReactNode> {
  const { slug } = params;
  const { name, description, images, reviews } = await getRestaurantBySlug(
    slug
  );

  return (
    <div className="grid grid-cols-3 gap-8 relative *:shadow-lg *:rounded-lg">
      <div className="col-span-2 rounded bg-white">
        <RestaurantMenuBar slug={slug} />
        <Separator />
        <h1 className="m-5 font-extrabold text-5xl">{name}</h1>
        <div className="m-5 mt-0">
          <RestaurantRating reviews={reviews} />
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
      <div className="h-20 bg-green-800 sticky top-20"></div>
    </div>
  );
}
