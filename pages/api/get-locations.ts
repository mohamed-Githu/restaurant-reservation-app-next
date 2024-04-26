import { getLocations } from "@/app/utils/locations";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json(await getLocations());
}