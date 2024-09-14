import { Wine, WineFilterProps } from "@/types/wines";
import axiosInstance from "../axiosInstance";

export interface Response {
  list: Wine[];
  nextCursor: number | null;
}

export default async function getWines(
  limit: number,
  wineFilter: WineFilterProps,
  debouncedWineName: string,
  wineCursor: number | null,
): Promise<Response> {
  try {
    const { wineType, winePrice, wineRating } = wineFilter;

    const ratingQuery = wineRating !== 0 ? `&rating=${wineRating}` : "";

    const response = await axiosInstance.get<Response>(
      `/wines?limit=${limit}&type=${wineType}&minPrice=${winePrice.min}&maxPrice=${winePrice.max}&name=${debouncedWineName}&cursor=${wineCursor}${ratingQuery}`,
    );

    const list = response.data.list ?? [];
    const nextCursor = response.data.nextCursor ?? null;

    return {
      list,
      nextCursor,
    };
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return {
      list: [],
      nextCursor: null,
    };
  }
}
