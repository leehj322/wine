import Rating from "@/components/@shared/Rating";
import Button from "@/components/@shared/Button";
import getWineById from "@/libs/axios/wine/getWineById";
import { WineData } from "@/types/wines";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WineReviewModal from "@/components/wines/WineReviewModal";

function RatingChart({
  avgRatings,
  reviewCount,
}: {
  avgRatings: Record<string, number>;
  reviewCount: number;
}) {
  return (
    <div>
      {Object.entries(avgRatings)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([rating, count]) => {
          const widthPercentage = (count / reviewCount) * 100;
          return (
            <div
              key={rating}
              className="mb-2 flex items-center whitespace-nowrap"
            >
              <p className="text-lg-16px-medium text-light-gray-500">
                {rating}점
              </p>
              <div className="ml-4 h-1.5 w-full rounded-[50px] bg-light-gray-100">
                <div
                  className="h-1.5 rounded-[50px] bg-light-purple-100"
                  style={{ width: `${count === 0 ? 0 : widthPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default function WineRatingStats() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<WineData | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect((): void => {
    const getData = async (): Promise<void> => {
      if (typeof id === "string") {
        try {
          const fetchedData = await getWineById(id);
          setData(fetchedData);
        } catch (e) {
          console.error("데이터를 불러오는데 오류가 있습니다:", e);
        }
      }
    };

    getData();
  }, [id]);

  // 코드 리팩토링 진행 시에 로딩바 애니메이션 추가 예정
  // 시간이 몇 초 이상 걸리면 에러 페이지로 넘기는 방법도 괜찮을듯
  if (!data) {
    return <div>로딩 중...</div>;
  }

  const { avgRating, reviewCount, avgRatings } = data;

  return (
    <>
      {data.reviews.length === 0 ? (
        <>
          <div className="absolute left-1/2 mt-[360px] h-[42px] w-[113px] -translate-x-1/2 transform md:mt-[400px] xl:mt-[480px]">
            <Button buttonStyle="purple" onClick={handleModal}>
              리뷰 남기기
            </Button>
          </div>
          <WineReviewModal
            isOpen={isOpen}
            handleModal={handleModal}
            reviewType="post"
            reviewName="리뷰 등록"
          />
        </>
      ) : (
        <div className="relative right-0 mb-[210px] mt-[30px] w-full md:mb-0 md:mt-[60px] xl:absolute xl:w-[280px]">
          <div className="inline-flex items-center md:ml-16 xl:ml-0">
            <p className="text-[36px] font-extrabold text-light-gray-800 md:text-[54px]">
              {avgRating !== null ? avgRating.toFixed(1) : 0}
            </p>
            <div className="ml-[15px] flex flex-col md:ml-[30px]">
              <Rating
                rating={avgRating}
                width={112}
                height={24}
                className="cursor-default"
              />
              <p className="text-md-14px-regular text-light-gray-500">
                {reviewCount.toLocaleString()}개의 후기
              </p>
            </div>
          </div>
          <div className="absolute top-[80px] w-full md:right-16 md:top-0 md:w-[280px] xl:relative xl:left-0">
            <RatingChart avgRatings={avgRatings} reviewCount={reviewCount} />
          </div>
          <div className="absolute right-0 top-0 h-[42px] w-[113px] md:relative md:ml-16 md:mt-[10px] xl:ml-0 xl:mt-[30px]">
            <Button buttonStyle="purple" onClick={handleModal}>
              리뷰 남기기
            </Button>
          </div>
          <WineReviewModal
            isOpen={isOpen}
            handleModal={handleModal}
            reviewType="post"
            reviewName="리뷰 등록"
          />
        </div>
      )}
    </>
  );
}
