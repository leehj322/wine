import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  value: number;
  selectedValue: number | null;
  onChange: (value: number) => void;
}

export default function WineRatingRadio({
  children,
  value,
  selectedValue,
  onChange,
}: Props) {
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
