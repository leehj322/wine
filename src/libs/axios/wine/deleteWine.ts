import axiosInstance from "../axiosInstance";

export default async function deleteWine(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`wines/${id}`);
    console.log(`와인 ID ${id} 삭제`);
  } catch (error) {
    console.error(`와인 ID ${id} 삭제 실패:`, error);
    throw error;
  }
}
