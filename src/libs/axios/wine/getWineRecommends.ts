import axiosInstance from "../axiosInstance";
import { Response } from "./getWines";

export default async function getWineRecommends() {
  try {
    const response = await axiosInstance.get<Response>(
      `wines/recommended?limit=50`,
    );

    const body = response.data.list ?? [];

    return body;
  } catch (error) {
    console.error("wines 데이터 가져오기 실패:", error);
    return [];
  }
}
