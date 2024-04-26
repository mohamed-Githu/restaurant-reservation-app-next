import prisma from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  const reviews = await prisma.review.findMany({
    where: {
      restaurant: {
        id: parseInt(id),
      },
    },
    select: {
      rating: true,
      text: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  // if (!reviews) {
  //   return res.status(404).json([]);
  // }

  res.json(reviews);
}
