import axiosInstance from "../axiosInstance";

export default async function postReviewById(reviewData: any) {
  const token = localStorage.getItem("accessToken");

  try {
    await axiosInstance.post("reviews", reviewData, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error("리뷰를 전송하는데 오류가 있습니다:", e);
    throw e;
  }
}
