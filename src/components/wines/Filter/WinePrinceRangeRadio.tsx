import { ReactNode } from "react";
import { WinePrice } from "@/types/wines";

interface Props {
  children: ReactNode;
  value: { min: number; max: number };
  selectedValue: { min: number; max: number } | null;
  onChange: ({ min, max }: WinePrice) => void;
}

export default function WinePriceRangeRadio({
  children,
  value,
  selectedValue,
  onChange,
}: Props) {
  const isSelected =
    selectedValue?.min === value.min && selectedValue?.max === value.max;
  return (
    <div className="flex items-center gap-4">
      <input
        type="radio"
        id="red"
        name="wineRating"
        style={{
          width: "18px",
          height: "18px",
          border: "5px solid #F2F4F8",
          borderRadius: "30%",
          backgroundColor: isSelected ? "#6A42DB" : "#F2F4F8", // 보라색
          boxShadow: "0 0 0 1px#CFDBEA", // 추가 테두리 효과
        }}
        onClick={() => onChange({ min: value.min, max: value.max })}
      />
      <span>{children}</span>
    </div>
  );
}
