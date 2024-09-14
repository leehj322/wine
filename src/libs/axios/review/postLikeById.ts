import axiosInstance from "../axiosInstance";

export default async function postLikeById(reviewId: number) {
  const token = localStorage.getItem("accessToken");

  try {
    await axiosInstance.post(`reviews/${reviewId}/like`, {
      headers: {
        accept: "/",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("좋아요를 전송하는데 오류가 있습니다:", e);
    throw e;
  }
}
