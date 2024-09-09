import { Wine, WineFilterProps } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export interface Response {
  list: Wine[];
}

export default async function getWines(
  limit: number,
  wineFilter: WineFilterProps,
): Promise<Wine[]> {
  try {
    const { wineType, winePrice, wineName, wineRating } = wineFilter;
    const response = await axiosInstance.get<Response>(
      `/wines?limit=${limit}&type=${wineType}&minPrice=${winePrice.min}&maxPrice=${winePrice.max}&name=${wineName}&rating=${wineRating}`,
    );

    const body = response.data.list ?? [];

    return body;
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return [];
  }
}
