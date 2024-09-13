import { WineFlavorRange } from "@/components/wines/WineFlavorInputRange";
import Dropdown from "@/components/@shared/DropDown";
import { WineIdDataProps } from "@/types/wines";
import deleteReviewById from "@/libs/axios/review/deleteReviewById";
import timeAgo from "@/utils/TimeAgo";
import { translateAromaReverse } from "@/components/wines/TranslateAroma";
import Modal from "@/components/@shared/Modal";
import WineReviewModal from "@/components/wines/WineReviewModal";
import postLikeById from "@/libs/axios/review/postLikeById";
import deleteLikeById from "@/libs/axios/review/deleteLikeById";
import debounce from "@/utils/debounce";
import { useAuth } from "@/contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Profiles from "../../../public/images/img_pfp_default.svg";
import UnselectLike from "../../../public/images/icons/unselect_like.svg";
import SelectLike from "../../../public/images/icons/select_like.svg";
import DropdownButton from "../../../public/images/icons/dropdown_button.svg";
import DownArrow from "../../../public/images/icons/down_arrow.svg";
import SelectStar from "../../../public/images/icons/select_star.svg";
import UpArrow from "../../../public/images/icons/up_arrow.svg";

export default function WinesReviewSection({data}: WineIdDataProps) {
  const [likedReviews, setLikedReviews] = useState<Record<number, boolean>>({});
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<Record<number, boolean>>({});
  const [isPatchOpen, setIsPatchOpen] = useState<Record<number, boolean>>({});
  const { user } = useAuth();

  const handleToggle = (reviewId: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handleDeleteModal = (reviewId: number) => {
    setIsDeleteOpen((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handlePatchModal = (reviewId: number) => {
    setIsPatchOpen((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReviewById(reviewId);
      window.location.reload();
    } catch (e) {
      console.error("리뷰를 삭제하는데 오류가 있습니다:", e);
    }
  };

  const handleLikePostButton = debounce(async (reviewId: number) => {
    try {
      await postLikeById(reviewId);
      setLikedReviews((prevState) => ({
        ...prevState,
        [reviewId]: !prevState[reviewId],
      }));
    } catch (e) {
      console.error("좋아요를 전송하는데 오류가 있습니다:", e);
    }
  }, 300);

  const handleLikeDeleteButton = debounce(async (reviewId: number) => {
    try {
      await deleteLikeById(reviewId);
      setLikedReviews((prevState) => ({
        ...prevState,
        [reviewId]: !prevState[reviewId],
      }));
    } catch (e) {
      console.error("좋아요를 취소하는데 오류가 있습니다:", e);
    }
  }, 300);

  useEffect(() => {
    const loadMoreReviews = () => {
      setLoading(true);
      setTimeout(() => {
        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
        setLoading(false);
      }, 1000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreReviews();
        }
      },
      { threshold: 1.0 },
    );

    const target = document.querySelector("#load-more-trigger");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, visibleReviews]);

  return (
    <>
      <h2 className="mt-[60px] hidden text-xl-20px-bold text-light-gray-800 md:inline-block">
        리뷰 목록
      </h2>
      {data && data.reviews.length === 0 ? (
        <>
          <h2 className="text-xl-20px-bold text-light-gray-800 md:hidden">
            리뷰 목록
          </h2>
          <div className="mt-20 flex items-center justify-center xl:mt-40">
            <Image
              src="/images/not_review.png"
              alt="리뷰가 없어요"
              width={150}
              height={186}
            />
          </div>
        </>
      ) : (
        data.reviews.slice(0, visibleReviews).map((review) => {
          const translatedAromas = translateAromaReverse(review.aroma);
          const isExpanded = expandedReviews[review.id] || false;
          const isModalOpen = isDeleteOpen[review.id] || false;
          return (
            <div
              key={review.id}
              className="mt-[22px] max-w-[800px] rounded-2xl border border-gray-300 px-5 pt-4 md:px-10 md:pt-8"
            >
              <Modal
                isOpen={isModalOpen}
                onClose={() => handleDeleteModal(review.id)}
              >
                <div className="flex h-[172px] w-[353px] flex-col items-center justify-center gap-10 rounded-2xl bg-light-white px-4 pb-6 pt-8">
                  <p className="text-xl-20px-bold text-light-gray-800">
                    정말 삭제하시겠습니까?
                  </p>
                  <div className="gap-2.5 flex items-center justify-between">
                    <button
                      className="flex h-[54px] w-[156px] items-center justify-center rounded-xl border border-solid border-light-gray-300 bg-light-white px-5 py-4 text-lg-16px-bold text-light-gray-500"
                      onClick={() => handleDeleteModal(review.id)}
                    >
                      취소
                    </button>
                    <button
                      className="flex h-[54px] w-[156px] items-center justify-center rounded-xl bg-light-purple-100 px-5 py-4 text-lg-16px-bold text-light-white"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </Modal>
              <WineReviewModal
                isOpen={isPatchOpen[review.id]}
                handleModal={() => handlePatchModal(review.id)}
                value={review?.id}
                reviewType="patch"
                reviewName="수정하기"
              />
              <div className="w-full flex justify-between">
                <div className="flex gap-4">
                  <Image
                    className="max-h-[50px] max-w-[50px] rounded-full object-cover md:max-h-[64px] md:max-w-[64px]"
                    src={
                      review.user.image
                        ? review.user.image
                        : (Profiles as StaticImageData)
                    }
                    alt="프로필 사진"
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col justify-center md:gap-1">
                    <p className="max-w-[140px] md:max-w-[480px] truncate text-lg-16px-semibold text-light-gray-800 md:text-2lg-18px-semibold">
                      {review.user.nickname}
                    </p>
                    <p className="text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
                      {timeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>
                <div
                  className="min-w-[38px] flex h-8 w-[82px] flex-row-reverse items-start gap-[18px] md:h-[38px] md:w-[100px] md:gap-6"
                >
                  <Image
                    role="button"
                    src={UnselectLike as StaticImageData}
                    alt="좋아요"
                    width={38}
                    height={38}
                    onClick={() => handleLikePostButton(review.id)}
                    className={`${likedReviews[review.id] || review.user.id === user?.id || review.isLiked ? "hidden" : ""}`}
                  />
                  <Image
                    role="button"
                    src={SelectLike as StaticImageData}
                    alt="좋아요"
                    width={38}
                    height={38}
                    onClick={() => handleLikeDeleteButton(review.id)}
                    className={`${likedReviews[review.id] || review.isLiked ? "" : "hidden"}`}
                  />
                  <div className={review.user.id === user?.id ? "" : "hidden"}>
                    <Dropdown
                      width="w-[101px] md:w-[126px]"
                      buttonChildren={
                        <Image
                          role="button"
                          src={DropdownButton as StaticImageData}
                          alt="메뉴 열기"
                          width={38}
                          height={38}
                        />
                      }
                    >
                      <button onClick={() => handlePatchModal(review.id)}>
                        수정하기
                      </button>
                      <button onClick={() => handleDeleteModal(review.id)}>
                        삭제하기
                      </button>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="mt-5 flex flex-wrap items-center gap-2 md:gap-2.5">
                  {translatedAromas.map((flavor) => (
                    <div
                      key={flavor}
                      className="inline-block rounded-[100px] border border-gray-300 px-2.5 py-1.5 text-md-14px-medium md:px-[15px] md:py-2 md:text-lg-16px-medium"
                    >
                      {flavor}
                    </div>
                  ))}
                </div>
                <div className="mt-5 inline-flex max-h-[36px] min-w-[60px] items-center gap-[2px] rounded-xl bg-light-purple-10 px-2.5 py-1.5 text-md-14px-bold text-light-purple-100 md:max-h-[42px] md:min-w-[80px] md:px-[15px] md:py-2 md:text-2lg-18px-bold">
                  <div className="min-h-4 min-w-4 md:min-h-5 md:min-w-5">
                    <Image
                      src={SelectStar as StaticImageData}
                      alt="별점"
                      width={20}
                      height={20}
                    />
                  </div>
                  {review.rating !== null ? review.rating.toFixed(1) : 0}
                </div>
              </div>
              <p
                className={`mt-6 text-md-14px-regular text-light-gray-800 md:text-lg-16px-regular ${isExpanded ? "" : "hidden"}`}
              >
                {review.content}
              </p>
              <div
                className={`mt-5 flex flex-col gap-[18px] ${isExpanded ? "" : "hidden"}`}
              >
                <WineFlavorRange
                  flavor="바디감"
                  typeOne="가벼워요"
                  typeTwo="진해요"
                  value={review.lightBold}
                />
                <WineFlavorRange
                  flavor="타닌"
                  typeOne="부드러워요"
                  typeTwo="떫어요"
                  value={review.smoothTannic}
                />
                <WineFlavorRange
                  flavor="당도"
                  typeOne="드라이해요"
                  typeTwo="달아요"
                  value={review.drySweet}
                />
                <WineFlavorRange
                  flavor="산미"
                  typeOne="안셔요"
                  typeTwo="많이셔요"
                  value={review.softAcidic}
                />
              </div>
              <Image
                role="button"
                src={DownArrow as StaticImageData}
                alt="더보기"
                className={`mx-auto my-3.5 flex ${isExpanded ? "hidden" : ""}`}
                onClick={() => handleToggle(review.id)}
              />
              <Image
                role="button"
                src={UpArrow as StaticImageData}
                alt="작게보기"
                className={`mx-auto my-3.5 flex ${isExpanded ? "" : "hidden"}`}
                onClick={() => handleToggle(review.id)}
              />
            </div>
          );
        })
      )}
      <div id="load-more-trigger" />
    </>
  );
}
