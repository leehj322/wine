import axiosInstance from "../axiosInstance";

export default async function postReviewById(reviewData: any) {
  const token = localStorage.getItem("accessToken");

  try {
    const response = await axiosInstance.post("reviews",
      reviewData,
      {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("리뷰를 전송하는데 성공했습니다:", response.data);
  } catch (e) {
    console.error("리뷰를 전송하는데 오류가 있습니다:", e);
    throw e;
  }
}
