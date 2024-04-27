import { getRestaurantBySlug } from "@/app/utils/restaurants";
import { Metadata } from "next";
import { RestaurantDetailsPageProps } from "./types";
import DetailsView from "../details-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ItemsGrid from "../items-grid";
import ReservationView from "../reservation-view";
import { isReviewedAction } from "@/actions/is-reviewed-action";
import ReviewsList from "./reviews-list";

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

  const {
    name,
    description,
    images,
    open_time,
    close_time,
    items,
    max_seat_number,
    min_seat_number,
    id,
  } = await getRestaurantBySlug(slug);

  const isReviewed = await isReviewedAction(id);

  const res = await fetch(`${process.env.BASE_URL}/api/get-restaurant-reviews?id=${id}`, {
    cache: "no-store",
    next: { tags: ["reviews"] },
  });

  const reviews = await res.json();

  return (
    <Tabs defaultValue="overview">
      <div className="grid grid-cols-7 xl:grid-cols-5 gap-8 relative xl:gap-5 lg:grid-cols-1">
        <Card className="col-span-5 xl:col-span-3 lg:col-span-1 overflow-hidden">
          <TabsList className="m-4 *:px-12 xs:*:px-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="overview">
            <DetailsView
              name={name}
              description={description}
              images={images}
              reviews={reviews}
              openTime={open_time}
              closeTime={close_time}
              canReview={isReviewed}
            >
              {reviews.length > 0 && (
                <>
                  <h3 className="text-3xl sm:text-2xl font-extrabold mt-8 mb-2 mx-4">
                    Reviews
                  </h3>
                  <Separator />
                  <ReviewsList reviews={reviews} />
                </>
              )}
            </DetailsView>
          </TabsContent>
          <TabsContent value="menu">
            <ItemsGrid items={items} />
          </TabsContent>
        </Card>
        <ReservationView
          maxSeatsNumber={max_seat_number}
          minSeatsNumber={min_seat_number}
          restaurantId={id}
          className="col-span-2 lg:col-span-1 h-min sticky top-12 lg:mx-auto xs:max-w-96"
        />
      </div>
    </Tabs>
  );
}
