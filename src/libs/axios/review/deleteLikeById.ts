import axiosInstance from "../axiosInstance";

export default async function deleteLikeById(reviewId: number) {
  const token = localStorage.getItem("accessToken");

  try {
    await axiosInstance.delete(`reviews/${reviewId}/like`, {
      headers: {
        accept: "/",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("좋아요를 취소하는데 오류가 있습니다:", e);
    throw e;
  }
}
