import axiosInstance from "../axiosInstance";

interface ReviewData {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
}

export default async function updateReview(
  id: number,
  reviewData: ReviewData,
): Promise<ReviewData> {
  try {
    const res = await axiosInstance.patch<ReviewData>(
      `reviews/${id}`,
      reviewData,
    );
    console.log("리뷰 수정 성공:", res.data);
    return res.data; // 수정된 리뷰 데이터 반환
  } catch (error) {
    console.error("리뷰 수정 실패:", error);
    throw error; // 에러를 호출자에게 전달
  }
}
