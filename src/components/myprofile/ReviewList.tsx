import { Dispatch, SetStateAction } from "react";
import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  wine: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    avgRating: number;
    type: string;
  };
}

interface ReviewData {
  totalCount: number;
  nextCursor: number;
  list: Review[];
}

interface ReviewListProps {
  reviewData: ReviewData;
  setReviewData: Dispatch<SetStateAction<ReviewData | undefined>>;
  fetchData: () => Promise<void>;
}

export default function ReviewList({
  reviewData,
  setReviewData,
  fetchData,
}: ReviewListProps) {
  const handleUpdateReview = (updatedReview: Review) => {
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

  if (reviewData.list.length === 0) {
    return <div>등록된 리뷰가 없습니다.</div>;
  }

  // 리뷰를 최신순으로 정렬
  const sortedReviews = [...reviewData.list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      {sortedReviews.map((review) => (
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
