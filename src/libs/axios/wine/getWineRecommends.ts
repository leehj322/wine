import { Wine } from "@/types/wines";
import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getWineRecommends() {
  try {
    const response: AxiosResponse<Wine[]> = await axiosInstance.get(
      `wines/recommended?limit=10`,
    );

    const body = response.data ?? [];

    return body;
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return [];
  }
}
