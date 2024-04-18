import { Separator } from "@/components/ui/separator";
import RestaurantMenuBar from "./restaurant-menu-bar";
import { getRestaurantBySlug } from "@/app/utils/restaurants";
import { RestaurantDetailsType } from "@/app/types/restaurant-types";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: RestaurantDetailsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
  const { name, description, images } = await getRestaurantBySlug(slug);

  return (
    <div className="grid grid-cols-3 gap-8 relative mt-10 *:shadow *:rounded">
      <div className="col-span-2 ">
        <RestaurantMenuBar slug={slug} />
        <Separator />
        <h1 className="m-5 font-extrabold text-5xl">{name}</h1>
        <Separator />
        <p className="p-4 font-medium leading-5">{description}</p>
        <h3 className="text-3xl font-extrabold mt-8 mb-2 mx-4">
          {images.length} Photos
        </h3>
        <Separator />
        <div className="grid grid-cols-3 p-4 gap-3">
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
      </div>
      <div className="h-20 bg-green-800 sticky top-10"></div>
    </div>
  );
}
