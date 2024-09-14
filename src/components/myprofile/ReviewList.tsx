import { Dispatch, SetStateAction } from "react";
import { MyProfileReview, MyProfileReviewData } from "@/types/review";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviewData: MyProfileReviewData;
  setReviewData: Dispatch<SetStateAction<MyProfileReviewData | undefined>>;
  fetchData: () => Promise<void>;
}

export default function ReviewList({
  reviewData,
  setReviewData,
  fetchData,
}: ReviewListProps) {
  const handleUpdateReview = (updatedReview: MyProfileReview) => {
    setReviewData((prev) => {
      if (!prev) {
        return {
          totalCount: 0,
          nextCursor: 0,
          list: [updatedReview],
        };
      }

      return {
        ...prev,
        list: prev.list.map((review) =>
          review.id === updatedReview.id ? updatedReview : review,
        ),
      };
    });
  };

  const handleDeleteReview = async () => {
    await fetchData(); // 리뷰 삭제 후 데이터 다시 불러오기
  };

  if (reviewData.totalCount === 0) {
    return <div>등록된 리뷰가 없습니다.</div>;
  }

  return (
    <>
      {reviewData.list.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onUpdate={handleUpdateReview}
          onDelete={handleDeleteReview}
        />
      ))}
    </>
  );
}
