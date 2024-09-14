import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { WineEnum, WineFilterProps, WinePrice } from "@/types/wines";
import PriceRangeInput from "../../@shared/PriceRangeInput";
import Button from "../../@shared/Button";
import WineTypeRadio from "./WineTypeRadio";
import WineRatingRadio from "./WineRatingRadio";
import WinePriceRangeRadio from "./WinePriceRangeRadio";

interface Props {
  wineFilterValue: WineFilterProps;
  winePriceRangeValue: WinePrice;
  onFilterChange: (newFilterValue: WineFilterProps) => void;
  onPriceRangeChange: (priceRange: WinePrice) => void;
  onClose: () => void;
}

export default function WineFilter({
  wineFilterValue,
  winePriceRangeValue,
  onFilterChange,
  onPriceRangeChange,
  onClose,
}: Props) {
  const wineTypes = [
    { id: 1, value: WineEnum.Red },
    { id: 2, value: WineEnum.White },
    { id: 3, value: WineEnum.Sparkling },
  ];

  const [winePrice, setWinePrice] = useState<WinePrice>({
    min: wineFilterValue.winePrice.min,
    max: wineFilterValue.winePrice.max,
  });

  const [wineSelectedPriceRange, setWineSelectedPriceRange] = useState({
    min: winePriceRangeValue.min,
    max: winePriceRangeValue.max,
  });

  const debouncedWinePrice = useDebounce(winePrice, 300);

  const wineRatings = [
    { id: 0, value: 0, label: "전체" },
    { id: 1, value: 5.0, label: "4.5 - 5.0" },
    { id: 2, value: 4.5, label: "4.0 - 4.5" },
    { id: 3, value: 4.0, label: "3.5 - 4.0" },
    { id: 4, value: 3.5, label: "3.0 - 3.5" },
  ];

  const winePriceRanges = [
    { id: 0, min: 0, max: 100000, label: "0원 ~ 10만원" },
    { id: 1, min: 100000, max: 1000000, label: "10만원 ~ 100만원" },
    { id: 2, min: 1000000, max: 10000000, label: "100만원 ~ 1000만원" },
  ];

  const handleWineRangeChange = ({ min, max }: WinePrice) => {
    setWineSelectedPriceRange({ min, max });
    setWinePrice({ min, max }); // winePrice 상태 업데이트

    onPriceRangeChange({ min, max });
  };

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

  const handlePriceChange = (min: number, max: number) => {
    if (winePrice?.min !== min || winePrice.max !== max) {
      setWinePrice({ min, max });
    }
  };

  const handleResetClick = () => {
    onFilterChange({
      ...wineFilterValue,
      wineType: WineEnum.Red,
      winePrice: { min: 0, max: 100000 },
      wineRating: 0,
    });

    setWinePrice({ min: 0, max: 100000 });
    setWineSelectedPriceRange({ min: 0, max: 100000 });
  };

  useEffect(() => {
    if (debouncedWinePrice) {
      onFilterChange({
        ...wineFilterValue,
        winePrice: debouncedWinePrice,
      });
    }
  }, [debouncedWinePrice]);

  return (
    <div className="z-50 flex w-[284px] flex-col gap-16 bg-light-white max-xl:h-[732px] max-xl:h-full max-xl:w-[420px] max-xl:gap-8 max-xl:rounded-3xl max-xl:p-8 max-md:w-[350px] max-md:w-[375px]">
      <div className="flex flex-col gap-3 max-md:gap-0">
        <p className="hidden text-2xl-24px-bold max-xl:block max-md:text-xl-20px-bold">
          필터
        </p>
        <p className="text-xl-20px-bold max-md:text-lg-16px-semibold">
          WINE TYPES
        </p>
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
      <div className="flex flex-col gap-4 max-md:gap-2">
        <p className="text-xl-20px-bold max-md:text-lg-16px-semibold">PRICE</p>

        <div className="flex flex-col gap-3">
          {winePriceRanges.map((wineRange) => (
            <WinePriceRangeRadio
              key={wineRange.id}
              value={{ min: wineRange.min, max: wineRange.max }}
              selectedValue={{
                min: wineSelectedPriceRange.min,
                max: wineSelectedPriceRange.max,
              }}
              onChange={handleWineRangeChange}
            >
              {wineRange.label}
            </WinePriceRangeRadio>
          ))}
        </div>

        <PriceRangeInput
          onPriceChange={handlePriceChange}
          minPrice={wineSelectedPriceRange.min}
          maxPrice={wineSelectedPriceRange.max}
          minValue={winePrice.min}
          maxValue={winePrice.max}
        />
      </div>
      <div className="flex flex-col gap-3 max-md:gap-1">
        <p className="text-xl-20px-bold max-md:text-lg-16px-semibold">RATING</p>

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
