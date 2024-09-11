import Modal from "@/components/@shared/Modal";
import Image, { StaticImageData } from "next/image";
import RatingInput from "@/components/@shared/RatingInput";
import { WineFlavorInputRange } from "@/components/wines/WineFlavorInputRange";
import WineFlavorList from "@/components/wines/WineFlavorList";
import Button from "@/components/@shared/Button";
import React, { useEffect, useState } from "react";
import { WineData, WineReview, WineReviewModalProps } from "@/types/wines";
import { useRouter } from "next/router";
import {
  translateAroma,
  translateAromaReverse,
} from "@/components/wines/TranslateAroma";
import postReviewById from "@/libs/axios/review/postReviewById";
import getWineById from "@/libs/axios/wine/getWineById";
import getReviewById from "@/libs/axios/review/getReviewById";
import patchReviewById from "@/libs/axios/review/patchReviewByid";
import CloseIcon from "../../../public/images/icons/close.svg";
import ReviewModalWine from "../../../public/images/icons/review_modal_wine.svg";

export default function WineReviewModal({
  isOpen,
  handleModal,
  value,
  reviewType,
  reviewName,
}: WineReviewModalProps) {
  const [data, setData] = useState<WineData | null>(null);
  const [review, setReview] = useState<WineReview | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const [ratingValue, setRatingValue] = useState(3);
  const [lightBold, setLightBold] = useState(0);
  const [smoothTannic, setSmoothTannic] = useState(0);
  const [drySweet, setDrySweet] = useState(0);
  const [softAcidic, setSoftAcidic] = useState(0);
  const [aroma, setAroma] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const handleRatingChange = (value: number) => setRatingValue(value);
  const handleLightBoldChange = (value: number) => setLightBold(value);
  const handleSmoothTannicChange = (value: number) => setSmoothTannic(value);
  const handleDrySweetChange = (value: number) => setDrySweet(value);
  const handleSoftAcidicChange = (value: number) => setSoftAcidic(value);
  const handleAromaChange = (value: string[]) => setAroma(value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleSubmit = async () => {
    const translatedAroma = translateAroma(aroma);

    const reviewData = {
      rating: ratingValue,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: translatedAroma,
      content,
      wineId: data?.id,
    };

    const patchData = {
      rating: ratingValue,
      lightBold,
      smoothTannic,
      drySweet,
      softAcidic,
      aroma: translatedAroma,
      content,
    };

    if (reviewType === "post") {
      try {
        await postReviewById(reviewData);
        handleModal();
        window.location.reload();
      } catch (e) {
        console.error("리뷰를 전송하는데 실패했습니다:", e);
      }
    } else if (reviewType === "patch") {
      try {
        if (typeof value === "number") {
          await patchReviewById(value, patchData);
        }
        handleModal();
        window.location.reload();
      } catch (e) {
        console.error("리뷰를 수정하는데 실패했습니다:", e);
      }
    }
  };

  useEffect((): void => {
    const getData = async (): Promise<void> => {
      if (typeof id === "string") {
        try {
          const fetchedData = await getWineById(id);
          setData(fetchedData);
          if (typeof value === "number") {
            const fetchedReview = await getReviewById(value);
            setReview(fetchedReview);

            if (fetchedReview) {
              setRatingValue(fetchedReview.rating);
              setLightBold(fetchedReview.lightBold);
              setSmoothTannic(fetchedReview.smoothTannic);
              setDrySweet(fetchedReview.drySweet);
              setSoftAcidic(fetchedReview.softAcidic);
              setAroma(fetchedReview.aroma ?? []);
              setContent(fetchedReview.content);
            }
          }
        } catch (e) {
          console.error("데이터를 불러오는데 오류가 있습니다:", e);
        }
      }
    };

    getData();
  }, [id, value]);

  // 코드 리팩토링 진행 시에 로딩바 애니메이션 추가 예정
  // 시간이 몇 초 이상 걸리면 에러 페이지로 넘기는 방법도 괜찮을듯
  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleModal}>
      <div className="max-h-[90vh] w-[375px] overflow-y-auto rounded-2xl bg-light-white p-6 md:w-[528px]">
        <div className="flex items-center justify-between">
          <h2 className="text-xl-20px-bold text-light-gray-800 md:text-2xl-24px-bold">
            {reviewName}
          </h2>
          <div className="max-h-6 max-w-6 md:min-h-[34px] md:min-w-[36px]">
            <Image
              role="button"
              src={CloseIcon as StaticImageData}
              alt="닫기"
              onClick={handleModal}
            />
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-center gap-4">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-lg bg-light-gray-100">
              <Image src={ReviewModalWine as StaticImageData} alt="와인" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg-16px-bold text-light-gray-800 md:text-2lg-18px-semibold">
                {data.name}
              </p>
              <div className="hidden md:block">
                <RatingInput
                  rating={ratingValue ?? 3}
                  name="rating"
                  onChange={handleRatingChange}
                  width={160}
                  height={32}
                />
              </div>
              <div className="block md:hidden">
                <RatingInput
                  rating={ratingValue ?? 3}
                  name="rating"
                  onChange={handleRatingChange}
                  width={120}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        <textarea
          placeholder="후기를 작성해 주세요"
          className="mt-6 h-[100px] w-[327px] cursor-default rounded-2xl border border-solid border-light-gray-300 bg-light-white px-5 py-[14px] md:h-[120px] md:w-[480px]"
          value={content}
          onChange={handleContentChange}
        />
        <p className="mt-8 text-2lg-18px-bold text-light-gray-800 md:mt-10 md:text-xl-20px-bold">
          와인의 맛은 어땠나요?
        </p>
        <div className="mt-6 flex flex-col gap-[18px]">
          <WineFlavorInputRange
            flavor="바디감"
            typeOne="가벼워요"
            typeTwo="진해요"
            value={review?.lightBold}
            onChange={handleLightBoldChange}
          />
          <WineFlavorInputRange
            flavor="타닌"
            typeOne="부드러워요"
            typeTwo="떫어요"
            value={review?.smoothTannic}
            onChange={handleSmoothTannicChange}
          />
          <WineFlavorInputRange
            flavor="당도"
            typeOne="드라이해요"
            typeTwo="달아요"
            value={review?.drySweet}
            onChange={handleDrySweetChange}
          />
          <WineFlavorInputRange
            flavor="산미"
            typeOne="안셔요"
            typeTwo="많이셔요"
            value={review?.softAcidic}
            onChange={handleSoftAcidicChange}
          />
        </div>
        <p className="mt-8 text-2lg-18px-bold text-light-gray-800 md:mt-10 md:text-xl-20px-bold">
          기억에 남는 향이 있나요?
        </p>
        <WineFlavorList
          aroma={translateAromaReverse(aroma)}
          onChange={handleAromaChange}
        />
        <div className="mt-10 h-[54px]">
          <Button buttonStyle="purple" onClick={handleSubmit}>
            리뷰 남기기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
