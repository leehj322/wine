import { MyProfileReviewData } from "@/types/review";
import axiosInstance from "../axiosInstance";

export default async function getReviewData(cursor?: number | null) {
  const res = await axiosInstance.get<MyProfileReviewData>("users/me/reviews", {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}
