import axiosInstance from "../axiosInstance";

export default async function deleteReview(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`reviews/${id}`);
    console.log(`리뷰 ID ${id} 삭제`);
  } catch (error) {
    console.error(`리뷰 ID ${id} 삭제 실패:`, error);
    throw error;
  }
}
