import Image from "next/image";
import { useState } from "react";
import Dropdown from "../@shared/DropDown";
import Modal from "../@shared/Modal";

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
}

export default function WineCard({ wine }: WineCardProps) {
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeModifyButton, setActiveModifyButton] = useState(false);
  const [activeDeleteButton, setActiveDeleteButton] = useState(false);

  const handleOpenModifyModal = () => {
    setIsModifyModalOpen(true);
    setActiveModifyButton(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyModalOpen(false);
    setActiveModifyButton(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setActiveDeleteButton(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setActiveDeleteButton(false);
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
      <div className="absolute top-[42px] h-[228px] w-full rounded-[16px] border border-solid border-light-gray-300 bg-light-white" />
      <Modal isOpen={isModifyModalOpen} onClose={handleCloseModifyModal}>
        <div className="max-h-[90vh] w-[460px] overflow-y-auto rounded-[16px] bg-light-white">
          <div>내가 등록한 와인</div>
          <div>와인 이름</div>
          <div>가격</div>
          <div>원산지</div>
          <div>타입</div>
          <div>와인 사진</div>
        </div>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        삭제하기
      </Modal>
    </div>
  );
}
