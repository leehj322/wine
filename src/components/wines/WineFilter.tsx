import { ReactNode, useCallback } from "react";
import { WineEnum, WineFilterProps } from "@/types/wines";
import PriceRangeInput from "../@shared/PriceRangeInput";

interface WineTypeProps {
  children: ReactNode;
  value: WineEnum;
  selectedValue: WineEnum | null;
  onChange: (value: WineEnum) => void;
}

interface WineRatingProps {
  children: ReactNode;
  value: string;
  selectedValue: string | null;
  onChange: (value: string) => void;
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
}: {
  wineFilterValue: WineFilterProps;
  onFilterChange: (newFilterValue: WineFilterProps) => void;
}) {
  const wineTypes = [
    { id: 1, label: "Red", value: WineEnum.Red },
    { id: 2, label: "White", value: WineEnum.White },
    { id: 3, label: "Sparkling", value: WineEnum.Sparkling },
  ];

  const wineRatings = [
    { id: 1, label: "전체" },
    { id: 2, label: "4.8 - 5.0" },
    { id: 3, label: "4.5 - 4.8" },
    { id: 4, label: "4.0 - 4.5" },
    { id: 5, label: "4.0 - 3.0" },
  ];

  const handleWineTypeChange = (value: WineEnum) => {
    onFilterChange({
      ...wineFilterValue,
      wineType: value,
    });
  };

  const handleWineRatingChange = (value: string) => {
    onFilterChange({
      ...wineFilterValue,
      wineRating: value,
    });
  };
  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      // 현재 wineFilterValue의 winePrice와 비교
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

  return (
    <div className="z-50 flex w-[284px] flex-col gap-16 bg-light-white">
      <div className="flex flex-col gap-3">
        <p className="text-xl-20px-bold"> WINE TYPES</p>
        <div className="flex gap-3">
          {wineTypes.map((wineType) => (
            <WineTypeRadio
              key={wineType.id}
              value={wineType.value}
              selectedValue={wineFilterValue.wineType}
              onChange={handleWineTypeChange}
            >
              {wineType.label}
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
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xl-20px-bold">RATING</p>

        {wineRatings.map((wineRating) => (
          <WineRatingRadio
            key={wineRating.id}
            value={wineRating.label}
            selectedValue={wineFilterValue.wineRating}
            onChange={handleWineRatingChange}
          >
            {wineRating.label}
          </WineRatingRadio>
        ))}
      </div>
    </div>
  );
}
