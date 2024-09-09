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
import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoint";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineFilterValue, setWineFilterValue] = useState<WineFilterProps>({
    wineType: WineEnum.Red,
    winePrice: { min: 0, max: 100000 },
    wineRating: 0,
    wineName: "",
  });

  const [isAddWineModalOpen, toggleIsAddWineModalOpen] = useToggle(false);
  const [isFilterModalOpen, toggleIsFilterModalOpen] = useToggle(false);
  const [isMobileView, setIsMobileView] = useState(false);

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

  const handleAddWineChange = () => {
    fetchWines();
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.DESKTOP_MIN_WIDTH) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-[1140px] flex-col gap-6 py-10 max-xl:mx-[40px]">
      <GlobalNavBar />
      <WineRecommendItemList />

      <div className="flex items-center justify-end max-xl:justify-between max-xl:gap-2 max-md:flex-col-reverse max-md:items-start">
        <div className="hidden h-[48px] min-w-[48px] max-xl:block">
          <Button buttonStyle="gray" onClick={() => toggleIsFilterModalOpen()}>
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
            onClose={() => toggleIsFilterModalOpen()}
          />
        </Modal>

        <label
          className="relative block w-[800px] max-xl:max-w-full"
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

        {isMobileView && (
          <>
            <div className="hidden h-[45px] w-[284px] max-xl:block max-xl:w-[220px] max-md:fixed max-md:bottom-5 max-md:w-[calc(100%-80px)]">
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
              <AddWine
                onClose={() => toggleIsAddWineModalOpen()}
                onAddWine={handleAddWineChange}
              />
            </Modal>
          </>
        )}
      </div>

      <div>
        <div className="flex">
          {!isMobileView && (
            <div className="block flex w-[340px] flex-col gap-16">
              <WineFilter
                wineFilterValue={wineFilterValue}
                onFilterChange={handleFilterChange}
                onClose={() => toggleIsFilterModalOpen()}
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
                <AddWine
                  onClose={() => toggleIsAddWineModalOpen()}
                  onAddWine={handleAddWineChange}
                />
              </Modal>
            </div>
          )}

          <WineItemList wines={wineList} />
        </div>
      </div>
    </div>
  );
}
