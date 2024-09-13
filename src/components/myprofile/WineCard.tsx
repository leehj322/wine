import Image from "next/image";
import React, { useState } from "react";
import { MyProfileWine, WineEnum } from "@/types/wines";
import postImage from "@/libs/axios/image/postImage";
import updateWine from "@/libs/axios/wine/patchWine";
import deleteWine from "@/libs/axios/wine/deleteWine";
import { useRouter } from "next/router";
import Dropdown from "../@shared/DropDown";
import Modal from "../@shared/Modal";
import Button from "../@shared/Button";
import Input from "../@shared/Input";
import FileInput from "../@shared/FileInput";
import InputSelect from "../@shared/InputSelect";

interface WineCardProps {
  wine: MyProfileWine;
  onUpdate: (updatedWine: MyProfileWine) => void;
  onDelete: () => void;
}

export default function WineCard({ wine, onUpdate, onDelete }: WineCardProps) {
  const router = useRouter();
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModifyButton, setActiveModifyButton] = useState(false);
  const [activeDeleteButton, setActiveDeleteButton] = useState(false);
  const [wineValue, setWineValue] = useState({
    name: wine.name,
    region: wine.region,
    image: wine.image,
    price: wine.price,
    avgRating: wine.avgRating,
    type: wine.type,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const wineTypes = [
    { id: 1, value: WineEnum.Red },
    { id: 2, value: WineEnum.White },
    { id: 3, value: WineEnum.Sparkling },
  ];

  const handleChangeWineType = (type: WineEnum) => {
    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      type,
    }));
  };

  const handleChangeImage = (image: File | null) => {
    if (image) {
      setImageFile(image);
    } else {
      setImageFile(null);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWineValue((prevWineValue) => ({
      ...prevWineValue,
      [name]: name === "price" ? Number(value) : value, // 가격일 경우 숫자로 변환
    }));
  };

  const handleOpenModifyModal = () => {
    setIsModifyModalOpen(true);
    setActiveModifyButton(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setActiveModifyButton(false);
    setWineValue({
      name: wine.name,
      region: wine.region,
      image: wine.image,
      price: wine.price,
      avgRating: wine.avgRating,
      type: wine.type,
    }); // 초기 상태로 리셋
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setActiveDeleteButton(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setActiveDeleteButton(false);
  };

  const handleSubmit = async () => {
    try {
      let imgUrl = wine.image; // 기존 이미지 URL로 초기화
      if (imageFile) {
        imgUrl = await postImage(imageFile); // 이미지 파일이 있을 경우에만 업로드
      }
      const patchWineValue = { ...wineValue, image: imgUrl };
      console.log("patchWineValue:", patchWineValue);
      const result = await updateWine(wine.id, patchWineValue);
      const completeWine: MyProfileWine = {
        ...result,
        id: wine.id,
        avgRating: wine.avgRating,
        reviewCount: wine.reviewCount,
        recentReview: wine.recentReview,
        userId: wine.userId,
      };
      onUpdate(completeWine);
      setIsModifyModalOpen(false);
    } catch (error) {
      console.error("와인 수정 오류:", error);
    }
  };

  const handleDeleteWine = async () => {
    try {
      await deleteWine(wine.id);
      onDelete();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("리뷰 삭제하기 오류:", error);
    }
  };

  const navigateToWineDetail = () => {
    router.push(`/wines/${wine.id}`);
  };

  return (
    <div className="relative mt-[16px] flex h-[185px] w-full flex-col-reverse md:mt-[20px] md:h-[270px]">
      <button
        onClick={navigateToWineDetail}
        className="absolute left-[20px] z-10 h-[185px] w-[53px] md:left-[60px] md:h-[270px] md:w-[76px]"
      >
        <Image fill objectFit="cover" src={wine.image} alt="와인 이미지" />
      </button>
      <div className="absolute left-[93px] top-[133px] z-10 flex items-center justify-center rounded-[10px] bg-light-purple-10 px-[10px] py-[6px] text-md-14px-bold text-light-purple-100 md:left-[176px] md:top-[203px] md:rounded-[12px] md:px-[15px] md:py-[8px] md:text-2lg-18px-bold">
        ₩ {wine.price.toLocaleString()}
      </div>
      <div className="absolute left-[93px] right-[20px] top-[41px] z-10 flex h-[87px] w-[230px] justify-between md:left-[176px] md:right-[40px] md:top-[72px] md:h-[111px] md:w-[488px] xl:w-[584px]">
        <button
          onClick={navigateToWineDetail}
          className="flex w-[200px] flex-col gap-[20px] md:w-[460px] xl:w-[550px]"
        >
          <div className="w-full truncate text-start text-[20px] font-semibold leading-[24px] text-light-gray-800 md:text-[30px] md:leading-[36px]">
            {wine.name}
          </div>
          <div className="w-full truncate text-start text-md-14px-regular text-light-gray-500 md:text-lg-16px-regular">
            {wine.region}
          </div>
        </button>
        <div className="flex flex-col">
          <Dropdown
            buttonChildren={
              <div className="relative flex h-[24px] w-[24px] items-center justify-center md:h-[26px] md:w-[26px]">
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
      </div>
      <div className="absolute top-[21px] h-[164px] w-full rounded-[12px] border border-solid border-light-gray-300 bg-light-white md:top-[42px] md:h-[228px] md:rounded-[16px]" />
      <Modal isOpen={isModifyModalOpen} onClose={handleCloseModifyModal}>
        <div className="max-h-[90vh] w-[375px] overflow-y-auto rounded-[16px] bg-light-white p-[24px]">
          <h1 className="text-xl-20px-bold text-light-gray-800 md:text-2xl-24px-bold">
            내가 등록한 와인
          </h1>
          <div className="mt-[32px] flex flex-col gap-[14px] md:mt-[40px] md:gap-[16px]">
            <h3 className="text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              와인 이름
            </h3>
            <Input
              name="name"
              placeholder="와인 이름 입력"
              value={wineValue.name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[24px] flex flex-col gap-[14px] md:mt-[32px] md:gap-[16px]">
            <h3 className="text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              가격
            </h3>
            <Input
              name="price"
              type="number"
              placeholder="가격 입력"
              value={wineValue.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[24px] flex flex-col gap-[14px] md:mt-[32px] md:gap-[16px]">
            <h3 className="text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              원산지
            </h3>
            <Input
              name="region"
              placeholder="원산지 입력"
              value={wineValue.region}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[24px] flex flex-col gap-[10px] md:mt-[32px]">
            <h3 className="text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              타입
            </h3>
            <Dropdown
              width="w-full"
              buttonChildren={<InputSelect placeholder={wineValue.type} />}
              childType="wine"
            >
              {wineTypes.map((wineType) => (
                <button
                  type="button"
                  key={wineType.id}
                  value={wineType.value}
                  onClick={() => handleChangeWineType(wineType.value)}
                >
                  {wineType.value}
                </button>
              ))}
            </Dropdown>
          </div>
          <div className="mt-[24px] flex flex-col gap-[14px] md:mt-[32px] md:gap-[16px]">
            <h3 className="text-md-14px-medium text-light-gray-800 md:text-lg-16px-medium">
              와인 사진
            </h3>
            <FileInput
              id="image"
              onChangeImage={handleChangeImage}
              initialImage={wine.image}
              hasPreview
            />
          </div>
          <div className="mt-[40px] flex w-full justify-between">
            <div className="h-[54px] w-[96px] md:w-[108px]">
              <Button
                type="button"
                buttonStyle="light"
                onClick={handleCloseModifyModal}
              >
                취소
              </Button>
            </div>
            <div className="h-[54px] w-[223px] md:w-[294px]">
              <Button type="button" buttonStyle="purple" onClick={handleSubmit}>
                수정하기
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="rounded-[16px] border border-solid border-light-gray-300 bg-light-white px-[16px] pb-[24px] pt-[32px]">
          <div className="flex w-[321px] flex-col items-center gap-[40px]">
            <h1 className="text-2lg-18px-bold text-light-gray-800 md:text-xl-20px-bold">
              정말 삭제하시겠습니까?
            </h1>
            <div className="flex w-full justify-between">
              <div className="h-[54px] w-[156px]">
                <Button buttonStyle="gray" onClick={handleCloseDeleteModal}>
                  취소
                </Button>
              </div>
              <div className="h-[54px] w-[156px]">
                <Button buttonStyle="purple" onClick={handleDeleteWine}>
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
