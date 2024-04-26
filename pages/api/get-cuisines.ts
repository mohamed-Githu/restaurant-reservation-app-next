import { getCuisines } from "@/app/utils/cuisines";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getCuisines();

  return res.json(data);
}