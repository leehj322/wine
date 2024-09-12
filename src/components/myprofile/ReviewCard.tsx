import Image from "next/image";
import { useState } from "react";
import updateReview from "@/libs/axios/review/patchReview";
import deleteReview from "@/libs/axios/review/deleteReview";
import { MyProfileReview } from "@/types/review";
import { useRouter } from "next/router";
import Dropdown from "../@shared/DropDown";
import Modal from "../@shared/Modal";
import Button from "../@shared/Button";
import { WineFlavorInputRange } from "../wines/WineFlavorInputRange";
import WineFlavorList from "../wines/WineFlavorList";
import RatingInput from "../@shared/RatingInput";
import { translateAroma, translateAromaReverse } from "../wines/TranslateAroma";

interface ReviewCardProps {
  review: MyProfileReview;
  onUpdate: (updatedReview: MyProfileReview) => void;
  onDelete: () => void;
}

function formatTimeAgo(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30; // 평균적으로 한 달을 30일로 계산

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}초 전`;
  }
  if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}분 전`;
  }
  if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}시간 전`;
  }
  if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}일 전`;
  }

  const months = Math.floor(diffInSeconds / secondsInMonth);
  return `${months}개월 전`;
}

export default function ReviewCard({
  review,
  onUpdate,
  onDelete,
}: ReviewCardProps) {
  const router = useRouter();
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModifyButton, setActiveModifyButton] = useState(false);
  const [activeDeleteButton, setActiveDeleteButton] = useState(false);
  const [ratingValue, setRatingValue] = useState(review.rating);
  const [lightBold, setLightBold] = useState(review.lightBold);
  const [smoothTannic, setSmoothTannic] = useState(review.smoothTannic);
  const [drySweet, setDrySweet] = useState(review.drySweet);
  const [softAcidic, setSoftAcidic] = useState(review.softAcidic);
  const [aroma, setAroma] = useState(review.aroma);
  const [content, setContent] = useState(review.content);

  const handleRatingChange = (value: number) => setRatingValue(value);
  const handleLightBoldChange = (value: number) => setLightBold(value);
  const handleSmoothTannicChange = (value: number) => setSmoothTannic(value);
  const handleDrySweetChange = (value: number) => setDrySweet(value);
  const handleSoftAcidicChange = (value: number) => setSoftAcidic(value);
  const handleAromaChange = (value: string[]) => setAroma(value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleOpenModifyModal = () => {
    setIsModifyModalOpen(true);
    setActiveModifyButton(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setActiveModifyButton(false);
  };

  const handleUpdateReview = async () => {
    const reviewData = {
      rating: ratingValue,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: translateAroma(aroma),
      content,
    };

    try {
      const updatedReview = await updateReview(review.id, reviewData);
      const completeReview: MyProfileReview = {
        ...updatedReview,
        id: review.id,
        createdAt: review.createdAt,
        updatedAt: new Date().toISOString(), // 현재 시간을 updatedAt으로 사용
        user: review.user,
        wine: review.wine,
      };
      onUpdate(completeReview);
      handleCloseModifyModal();
    } catch (error) {
      console.error("리뷰 수정하기 오류:", error);
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setActiveDeleteButton(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setActiveDeleteButton(false);
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(review.id);
      onDelete();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("리뷰 삭제하기 오류:", error);
    }
  };

  const navigateToWineDetail = () => {
    router.push(`/wines/${review.wine.id}`);
  };

  return (
    <div className="flex w-full flex-col gap-[8px] xl:gap-[4px]">
      <div className="flex w-full flex-col gap-[17px] rounded-[16px] border border-solid border-light-gray-300 px-[20px] py-[16px] md:gap-[20px] md:px-[40px] md:pb-[30px] md:pt-[24px]">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-row gap-[15px]">
            <div className="flex h-[32px] w-[60px] items-center justify-center gap-[2px] rounded-[12px] bg-light-purple-10 px-[10px] py-[6px] text-md-14px-bold text-light-purple-100 md:h-[38px] md:w-[80px] md:px-[15px] md:py-[8px] md:text-2lg-18px-bold">
              <div className="relative h-[16px] w-[16px] md:h-[20px] md:w-[20px]">
                <Image fill src="images/icons/select_star.svg" alt="별점" />
              </div>
              {review.rating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
              {formatTimeAgo(review.createdAt)}
            </div>
          </div>
          <Dropdown
            buttonChildren={
              <div className="md:[26px] md:[26px] relative flex h-[24px] w-[24px] items-center justify-center">
                <Image
                  fill
                  src="images/icons/hamburger.svg"
                  alt="드롭다운 버튼"
                />
              </div>
            }
            width="w-[126px]"
          >
            <button
              type="button"
              onClick={handleOpenModifyModal}
              style={
                activeModifyButton
                  ? { backgroundColor: "#f1edfc", color: "#6a42db" }
                  : undefined
              }
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={handleOpenDeleteModal}
              style={
                activeDeleteButton
                  ? { backgroundColor: "#f1edfc", color: "#6a42db" }
                  : undefined
              }
            >
              삭제하기
            </button>
          </Dropdown>
        </div>
        <button
          onClick={navigateToWineDetail}
          className="flex w-full flex-col gap-[10px]"
        >
          <div className="text-md-14px-medium text-light-gray-500 md:text-lg-16px-medium">
            {review.wine.name}
          </div>
          <div className="text-md-14px-regular text-light-gray-800 md:text-lg-16px-regular">
            {review.content}
          </div>
        </button>
      </div>

      <Modal isOpen={isModifyModalOpen} onClose={handleCloseModifyModal}>
        <div className="max-h-[90vh] w-[375px] overflow-y-auto rounded-2xl bg-light-white px-[24px] py-[32px] md:w-[528px] md:p-[24px]">
          <div className="flex items-center justify-between">
            <h1 className="text-xl-20px-bold text-light-gray-800 md:text-2xl-24px-bold">
              수정하기
            </h1>
            <button
              type="button"
              onClick={handleCloseModifyModal}
              className="relative h-[24px] w-[24px] md:h-[34px] md:w-[34px]"
            >
              <Image fill src="images/icons/close.svg" alt="닫기" />
            </button>
          </div>
          <div className="mt-[40px]">
            <div className="flex items-center gap-[16px]">
              <div className="relative h-[67px] w-[67px] md:h-[68px] md:w-[68px]">
                <Image
                  fill
                  src="/images/icons/review_modal_wine.svg"
                  alt="와인 이미지"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="text-lg-16px-bold text-light-gray-800 md:text-2lg-18px-semibold">
                  Sentinel Carbernet Sauvignon 2016
                </div>
                <RatingInput
                  rating={ratingValue}
                  name="rating"
                  onChange={handleRatingChange}
                  width={120}
                  height={24}
                />
              </div>
            </div>
          </div>
          <textarea
            placeholder="후기를 작성해 주세요"
            className="mt-[24px] h-[100px] w-full cursor-default rounded-2xl border border-solid border-light-gray-300 bg-light-white px-[20px] py-[14px]"
            value={content}
            onChange={handleContentChange}
          />
          <h2 className="mt-[40px] text-2lg-18px-bold text-light-gray-800 md:text-xl-20px-bold">
            와인의 맛은 어땠나요?
          </h2>
          <div className="mt-[24px] flex w-full flex-col gap-[16px] md:gap-[18px]">
            <WineFlavorInputRange
              flavor="바디감"
              typeOne="가벼워요"
              typeTwo="진해요"
              value={lightBold}
              onChange={handleLightBoldChange}
            />
            <WineFlavorInputRange
              flavor="타닌"
              typeOne="부드러워요"
              typeTwo="떫어요"
              value={smoothTannic}
              onChange={handleSmoothTannicChange}
            />
            <WineFlavorInputRange
              flavor="당도"
              typeOne="드라이해요"
              typeTwo="달아요"
              value={drySweet}
              onChange={handleDrySweetChange}
            />
            <WineFlavorInputRange
              flavor="산미"
              typeOne="안셔요"
              typeTwo="많이셔요"
              value={softAcidic}
              onChange={handleSoftAcidicChange}
            />
          </div>
          <h2 className="mt-[40px] text-2lg-18px-bold text-light-gray-800 md:text-xl-20px-bold">
            기억에 남는 향이 있나요?
          </h2>
          <WineFlavorList
            aroma={translateAromaReverse(aroma)}
            onChange={handleAromaChange}
          />
          <div className="mt-[40px] h-[54px]">
            <Button buttonStyle="purple" onClick={handleUpdateReview}>
              수정하기
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="rounded-[16px] border border-solid border-light-gray-300 bg-light-white px-[16px] pb-[24px] pt-[32px]">
          <div className="flex w-[321px] flex-col items-center gap-[40px]">
            <h1 className="text-2lg-18px-bold text-xl-20px-bold text-light-gray-800">
              정말 삭제하시겠습니까?
            </h1>
            <div className="flex w-full justify-between">
              <div className="h-[54px] w-[156px]">
                <Button buttonStyle="gray" onClick={handleCloseDeleteModal}>
                  취소
                </Button>
              </div>
              <div className="h-[54px] w-[156px]">
                <Button buttonStyle="purple" onClick={handleDeleteReview}>
                  삭제
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
