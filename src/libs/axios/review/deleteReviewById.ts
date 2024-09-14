import axiosInstance from "../axiosInstance";

export default async function deleteReviewById(reviewId: number) {
  const token = localStorage.getItem("accessToken");

  try {
    await axiosInstance.delete(`reviews/${reviewId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("리뷰를 삭제하는데 오류가 있습니다:", e);
    throw e;
  }
}
