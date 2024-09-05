import WineFilter from "@/components/wines/WineFilter";
import WineItemList from "@/components/wines/WineItemList";
import WineRecommendItemList from "@/components/wines/WineRecommendItemList";
import getWines from "@/libs/axios/wine/getWines";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import { Wine, WineEnum, WineFilterProps } from "@/types/wines";
import React, { useEffect, useState } from "react";
import Button from "@/components/@shared/Button";
import Input from "@/components/@shared/Input";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/@shared/Modal";
import AddWine from "@/components/wines/AddWine";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineFilterValue, setWineFilterValue] = useState<WineFilterProps>({
    wineType: WineEnum.Red,
    winePrice: { min: 0, max: 100000 },
    wineRating: "",
    wineName: "",
  });

  const [isAddWineModalOpen, toggleIsAddWineModalOpen] = useToggle(false);
  const [isFilterModalOpen, toggleIsFilterModalOpen] = useToggle(false);

  async function fetchWines() {
    const getWineList: Wine[] = await getWines(10, wineFilterValue); // 와인 목록 조회
    setWineList(getWineList);
  }

  const handleFilterChange = (newFilterValue: WineFilterProps) => {
    setWineFilterValue(newFilterValue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWineFilterValue((prevValue) => ({
      ...prevValue,
      wineName: e.target.value,
    }));
  };

  useEffect(() => {
    fetchWines()
      .then(() => {
        // 성공적으로 데이터 로드
      })
      .catch((error) => {
        console.error("Error during fetching data:", error);
      });
  }, [wineFilterValue]);

  return (
    <div className="flex max-w-[1920px] flex-col items-center justify-center">
      <div className="flex max-w-[1140px] flex-col gap-6 py-10 max-[744px]:w-[744px] max-[744px]:px-6 max-[375px]:w-[375px]">
        <GlobalNavBar />
        <WineRecommendItemList />

        <div className="flex items-center justify-end max-[744px]:justify-between max-[744px]:gap-2 max-[375px]:flex-col-reverse max-[375px]:items-start">
          <div className="hidden h-[48px] w-[48px] max-[744px]:block">
            <Button
              buttonStyle="gray"
              onClick={() => toggleIsFilterModalOpen()}
            >
              <Image
                src="/images/ic_filter.svg"
                alt="filterIcon"
                width={26}
                height={26}
              />
            </Button>
          </div>
          {/* 타입을 프롭으로 넘기고 타입에따라 className을 변경할수있을까 일단 반응형 테스트 먼저 컴포넌트에서 해보는 걸로  */}
          <Modal
            isOpen={isFilterModalOpen}
            onClose={() => toggleIsFilterModalOpen()}
          >
            <WineFilter
              wineFilterValue={wineFilterValue}
              onFilterChange={handleFilterChange}
            />
          </Modal>

          <label
            className="relative block w-[800px] max-[744px]:max-w-[396px] max-[375px]:max-w-[327px]"
            htmlFor="search-input"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Image
                src="/images/ic_search.svg"
                alt="searchIcon"
                width={20}
                height={20}
              />
            </span>
            <Input
              id="search-input"
              className="pl-10"
              placeholder="와인을 검색해보세요"
              onChange={handleSearchChange}
            />
          </label>
          <div className="hidden h-[45px] w-[284px] max-[744px]:block max-[744px]:w-[220px] max-[375px]:hidden">
            <Button
              onClick={() => toggleIsAddWineModalOpen()}
              buttonStyle="purple"
            >
              와인 등록 하기
            </Button>
          </div>
          <Modal
            isOpen={isAddWineModalOpen}
            onClose={() => toggleIsAddWineModalOpen()}
          >
            <AddWine onClose={() => toggleIsAddWineModalOpen()} />
          </Modal>
        </div>

        <div>
          <div className="flex">
            <div className="block flex w-[340px] flex-col gap-16 max-[744px]:hidden">
              <WineFilter
                wineFilterValue={wineFilterValue}
                onFilterChange={handleFilterChange}
              />

              <div className="h-[50px] w-[284px]">
                <Button
                  onClick={() => toggleIsAddWineModalOpen()}
                  buttonStyle="purple"
                >
                  와인 등록 하기
                </Button>
              </div>
              <Modal
                isOpen={isAddWineModalOpen}
                onClose={() => toggleIsAddWineModalOpen()}
              >
                <AddWine onClose={() => toggleIsAddWineModalOpen()} />
              </Modal>
            </div>
            <div className="max-w-[800px] max-[744px]:max-w-[704px]">
              <WineItemList wines={wineList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
