import { ReactNode } from "react";
import { WineEnum } from "@/types/wines";

interface Props {
  children: ReactNode;
  value: WineEnum;
  selectedValue: WineEnum | null;
  onChange: (value: WineEnum) => void;
}

export default function WineTypeRadio({
  children,
  value,
  selectedValue,
  onChange,
}: Props) {
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
