import { WineData } from "@/types/wines"
import axiosInstance from "../axiosInstance"

export default async function getWineById (id: string):Promise<WineData> {
  try {
    const response = await axiosInstance.get(`wines/${id}`);
    return response.data as WineData;
  } catch (e) {
    console.error('데이터를 불러오는데 오류가 있습니다:', e);
    throw e;
  }
}