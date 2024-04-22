import { getRestaurantBySlug } from "@/app/utils/restaurants";
import { Metadata } from "next";
import { RestaurantDetailsPageProps } from "./types";
import ReservationForm from "../reservation-form";
import DetailsView from "../details-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const { name, description, images, reviews, open_time, close_time } =
    await getRestaurantBySlug(slug);

  return (
    <Tabs defaultValue="overview">
      <div className="grid grid-cols-7 gap-8 relative ">
        <Card className="col-span-5 overflow-hidden">
          <TabsList className="m-4 *:px-12">
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
            />
          </TabsContent>
          <TabsContent value="menu">these are the items</TabsContent>
        </Card>
        <ReservationForm
          openTime={open_time}
          closeTime={close_time}
          className="col-span-2 h-min sticky top-12"
        />
      </div>
    </Tabs>
  );
}
