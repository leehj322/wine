import { ReactNode, useCallback } from "react";
import useToggle from "@/hooks/useToggle";
import { WineEnum, WineFilterProps } from "@/types/wines";
import PriceRangeInput from "../@shared/PriceRangeInput";
import Button from "../@shared/Button";

interface Props {
  wineFilterValue: WineFilterProps;
  onFilterChange: (newFilterValue: WineFilterProps) => void;
  onClose: () => void;
}

interface WineTypeProps {
  children: ReactNode;
  value: WineEnum;
  selectedValue: WineEnum | null;
  onChange: (value: WineEnum) => void;
}

interface WineRatingProps {
  children: ReactNode;
  value: number;
  selectedValue: number | null;
  onChange: (value: number) => void;
}

function WineTypeRadio({
  children,
  value,
  selectedValue,
  onChange,
}: WineTypeProps) {
  return (
    <button
      className={`flex h-[42px] cursor-pointer items-center justify-center rounded-full border border-solid border-gray-300 border-light-gray-300 px-4 ${
        selectedValue === value
          ? "bg-light-purple-100 text-light-white"
          : "bg-light-white text-light-black"
      } `}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        name="wineType"
        value={value}
        style={{ display: "none" }}
        checked={selectedValue === value}
        onChange={() => {}}
      />
      <span> {children}</span>
    </button>
  );
}

function WineRatingRadio({
  children,
  value,
  selectedValue,
  onChange,
}: WineRatingProps) {
  return (
    <div className="] flex items-center gap-4">
      <input
        type="radio"
        id="red"
        name="wineRating"
        style={{
          width: "18px",
          height: "18px",
          border: "5px solid #F2F4F8",
          borderRadius: "30%",
          backgroundColor: selectedValue === value ? "#6A42DB" : "#F2F4F8", // 보라색
          boxShadow: "0 0 0 1px#CFDBEA", // 추가 테두리 효과
        }}
        onClick={() => onChange(value)}
      />
      <span>{children}</span>
    </div>
  );
}

export default function WineFilter({
  wineFilterValue,
  onFilterChange,
  onClose,
}: Props) {
  const [reset, setReset] = useToggle(false);
  const wineTypes = [
    { id: 1, value: WineEnum.Red },
    { id: 2, value: WineEnum.White },
    { id: 3, value: WineEnum.Sparkling },
  ];

  const wineRatings = [
    { id: 0, value: 0, label: "전체" },
    { id: 1, value: 5.0, label: "4.8 - 5.0" },
    { id: 2, value: 4.8, label: "4.5 - 4.8" },
    { id: 3, value: 4.5, label: "4.0 - 4.5" },
    { id: 4, value: 4.0, label: "3.0 - 4.0" },
  ];

  const handleWineTypeChange = (value: WineEnum) => {
    onFilterChange({
      ...wineFilterValue,
      wineType: value,
    });
  };

  const handleWineRatingChange = (value: number) => {
    onFilterChange({
      ...wineFilterValue,
      wineRating: value,
    });
  };
  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      if (
        wineFilterValue.winePrice.min !== min ||
        wineFilterValue.winePrice.max !== max
      ) {
        // 값이 변경되었을 때만 onFilterChange 호출
        onFilterChange({
          ...wineFilterValue,
          winePrice: { min, max },
        });
      }
    },
    [onFilterChange, wineFilterValue],
  );

  const handleResetClick = () => {
    onFilterChange({
      ...wineFilterValue,
      wineType: WineEnum.Red,
      winePrice: { min: 0, max: 100000 },
      wineRating: 0,
    });

    setReset();
  };

  return (
    <div className="z-50 flex w-[284px] flex-col gap-16 bg-light-white max-xl:h-[732px] max-xl:w-[375px] max-xl:rounded-3xl max-xl:p-6">
      <div className="flex flex-col gap-3">
        <p className="hidden text-2xl-24px-bold max-xl:block"> 필터</p>
        <p className="text-xl-20px-bold"> WINE TYPES</p>
        <div className="flex gap-3">
          {wineTypes.map((wineType) => (
            <WineTypeRadio
              key={wineType.id}
              value={wineType.value}
              selectedValue={wineFilterValue.wineType}
              onChange={handleWineTypeChange}
            >
              {wineType.value}
            </WineTypeRadio>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-xl-20px-bold">PRICE</p>
        <PriceRangeInput
          minPrice={0}
          maxPrice={100000}
          priceGap={10000}
          onPriceChange={(min, max) => handlePriceChange(min, max)}
          valueReset={reset}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xl-20px-bold">RATING</p>

        {wineRatings.map((wineRating) => (
          <WineRatingRadio
            key={wineRating.id}
            value={wineRating.value}
            selectedValue={wineFilterValue.wineRating}
            onChange={handleWineRatingChange}
          >
            {wineRating.label}
          </WineRatingRadio>
        ))}
      </div>

      <div className="hidden h-[54px] gap-2 max-xl:flex">
        <div className="w-1/3">
          <Button buttonStyle="light" onClick={handleResetClick}>
            초기화
          </Button>
        </div>
        <div className="w-2/3">
          <Button buttonStyle="purple" onClick={onClose}>
            필터 적용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
