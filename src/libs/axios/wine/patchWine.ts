import axiosInstance from "../axiosInstance";

interface WineData {
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
}

export default async function updateWine(
  id: number,
  wineData: WineData,
): Promise<WineData> {
  try {
    const res = await axiosInstance.patch<WineData>(`wines/${id}`, wineData);
    console.log("와인 수정 성공:", res.data);
    return res.data; // 수정된 와인 데이터 반환
  } catch (error) {
    console.error("와인 수정 실패:", error);
    throw error; // 에러를 호출자에게 전달
  }
}
