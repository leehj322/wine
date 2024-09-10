import Image from "next/image";
import React, { useState } from "react";
import { WineEnum } from "@/types/wines";
import postImage from "@/libs/axios/image/postImage";
import updateWine from "@/libs/axios/wine/patchWine";
import deleteWine from "@/libs/axios/wine/deleteWine";
import Dropdown from "../@shared/DropDown";
import Modal from "../@shared/Modal";
import Button from "../@shared/Button";
import Input from "../@shared/Input";
import FileInput from "../@shared/FileInput";
import InputSelect from "../@shared/InputSelect";

interface Wine {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: string[];
    rating: number;
    id: number;
  };
  userId: number;
}

interface WineCardProps {
  wine: Wine;
  onUpdate: (updatedWine: Wine) => void;
  onDelete: () => void;
}

export default function WineCard({ wine, onUpdate, onDelete }: WineCardProps) {
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
      const completeWine: Wine = {
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

  return (
    <div className="relative flex h-[270px] w-full flex-col-reverse">
      <Image
        src={wine.image}
        className="absolute left-[60px] z-10"
        width={76}
        height={270}
        alt="와인 이미지"
      />
      <div className="absolute left-[176px] top-[203px] z-10 flex h-[37px] w-[114px] items-center justify-center rounded-[12px] bg-light-purple-10 text-2lg-18px-bold text-light-purple-100">
        ₩ {wine.price.toLocaleString()}
      </div>
      <div className="absolute left-[176px] right-[40px] top-[72px] z-10 flex h-[111px] w-[584px] justify-between">
        <div className="flex flex-col gap-[20px]">
          <div className="text-3xl font-semibold text-light-gray-800">
            {wine.name}
          </div>
          <div className="text-lg-16px-regular text-light-gray-500">
            {wine.region}
          </div>
        </div>
        <div className="flex flex-col">
          <Dropdown
            buttonChildren={
              <div className="relative flex h-[26px] w-[26px] items-center justify-center">
                <Image
                  fill
                  src="images/icon/hamburger.svg"
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
      <div className="absolute top-[42px] h-[228px] w-full rounded-[16px] border border-solid border-light-gray-300 bg-light-white" />
      <Modal isOpen={isModifyModalOpen} onClose={handleCloseModifyModal}>
        <div className="max-h-[90vh] w-[460px] overflow-y-auto rounded-[16px] bg-light-white p-[24px]">
          <h1 className="text-2xl-24px-bold text-light-gray-800">
            내가 등록한 와인
          </h1>
          <div className="mt-[40px] flex flex-col gap-[16px]">
            <h3 className="text-lg-16px-medium text-light-gray-800">
              와인 이름
            </h3>
            <Input
              name="name"
              placeholder="와인 이름 입력"
              value={wineValue.name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[32px] flex flex-col gap-[16px]">
            <h3 className="text-lg-16px-medium text-light-gray-800">가격</h3>
            <Input
              name="price"
              type="number"
              placeholder="가격 입력"
              value={wineValue.price}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[32px] flex flex-col gap-[16px]">
            <h3 className="text-lg-16px-medium text-light-gray-800">원산지</h3>
            <Input
              name="region"
              placeholder="원산지 입력"
              value={wineValue.region}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mt-[32px] flex flex-col gap-[10px]">
            <h3 className="text-lg-16px-medium text-light-gray-800">타입</h3>
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
          <div className="mt-[32px] flex flex-col gap-[16px]">
            <h3 className="text-lg-16px-medium text-light-gray-800">
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
            <div className="h-[54px] w-[108px]">
              <Button
                type="button"
                buttonStyle="light"
                onClick={handleCloseModifyModal}
              >
                취소
              </Button>
            </div>
            <div className="h-[54px] w-[294px]">
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
            <h1 className="text-xl-20px-bold text-light-gray-800">
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
