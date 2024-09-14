import { PostWineDetails } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export interface Response {
  list: PostWineDetails[];
}

export default async function postWines({
  name,
  region,
  image,
  price,
  type,
}: PostWineDetails) {
  const response = await axiosInstance.post<Response>(
    "wines",
    { name, region, image, price, type },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const body = response.data;

  return body;
}
