import { MyProfileWineData } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export default async function getWineData(cursor?: number | null) {
  const res = await axiosInstance.get<MyProfileWineData>("users/me/wines", {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}
