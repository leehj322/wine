import WineFilter from "@/components/wines/Filter/WineFilter";
import WineItemList from "@/components/wines/WineItemList";
import WineRecommendItemList from "@/components/wines/WineRecommendItemList";
import getWines from "@/libs/axios/wine/getWines";
import GlobalNavBar from "@/components/@shared/GlobalNavBar";
import { Wine, WineEnum, WineFilterProps } from "@/types/wines";
import React, { useEffect, useState, useRef } from "react";
import Button from "@/components/@shared/Button";
import Input from "@/components/@shared/Input";
import Image from "next/image";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/@shared/Modal";
import AddWine from "@/components/wines/AddWine";
import useDebounce from "@/hooks/useDebounce";
import useIsMobile from "@/hooks/useIsMobile";

export default function WineListPage() {
  const [wineList, setWineList] = useState<Wine[]>([]);

  const [wineFilterValue, setWineFilterValue] = useState<WineFilterProps>({
    wineType: WineEnum.Red,
    winePrice: { min: 0, max: 100000 },
    wineRating: 0,
  });
  const [wineName, setWineName] = useState("");
  const [wineCursor, setWineCursor] = useState<number | null>(0);

  const [isAddWineModalOpen, toggleIsAddWineModalOpen] = useToggle(false);
  const [isFilterModalOpen, toggleIsFilterModalOpen] = useToggle(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 스크롤 감지할 요소

  const debouncedWineName = useDebounce(wineName, 300); // wineName에  디바운스 적용

  const isMobileView = useIsMobile();

  async function fetchWines() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const { list, nextCursor } = await getWines(
        5,
        wineFilterValue,
        debouncedWineName,
        wineCursor,
      ); // 와인 목록 조회

      if (wineCursor === 0) {
        setWineList(list);
      } else {
        setWineList((prevWines) => [...prevWines, ...list]);
      }
      setWineCursor(nextCursor); // 커서 업데이트
      setHasMore(nextCursor !== null); // 커서가 null이면 더 이상 불러올 데이터가 없음 ** 추후 테스트 **
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFilterChange = (newFilterValue: WineFilterProps) => {
    setWineFilterValue(newFilterValue);
    setWineList([]); // 필터 변경 시 목록 초기화
    setWineCursor(0);
    setHasMore(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWineName(e.target.value);
    setWineList([]); // 필터 변경 시 목록 초기화
    setWineCursor(0);
    setHasMore(true);
  };

  const handleAddWineChange = () => {
    fetchWines();
  };

  useEffect(() => {
    if (wineName || wineFilterValue) {
      fetchWines()
        .then(() => {
          // 성공적으로 데이터 로드
        })
        .catch((error) => {
          console.error("Error during fetching data:", error);
        });
    }
  }, [wineFilterValue, debouncedWineName]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        fetchWines();
      }
    };

    observer.current = new IntersectionObserver(handleIntersection);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current); // 요소 관찰 시작
    } else {
      console.error("loadMoreRef.current가 설정되지 않았습니다."); // 요소가 없을 경우 에러 로그 출력
    }

    return () => {
      if (observer.current) observer.current.disconnect(); // 컴포넌트 언마운트 시 관찰자 해제
    };
  }, [hasMore, isLoading, wineCursor]); // hasMore, isLoading이 변경될 때 관찰자 업데이트

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
            <div className="z-10 hidden h-[45px] w-[284px] max-xl:block max-xl:w-[220px] max-md:fixed max-md:bottom-5 max-md:w-[calc(100%-80px)]">
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

        <div
          ref={loadMoreRef}
          className={wineList.length === 0 ? "hidden" : "block h-[1px]"}
        >
          a
        </div>
      </div>
    </div>
  );
}
