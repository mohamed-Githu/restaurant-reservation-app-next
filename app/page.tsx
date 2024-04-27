import CardsGrid from "@/components/cards-grid";

export default async function Home() {
  const restaurants = await fetch(
    `${process.env.BASE_URL}/api/get-filtered-restaurants`
  ).then((res) => res.json());

  return (
    <>
      <CardsGrid restaurants={restaurants} />
    </>
  );
}
