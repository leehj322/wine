import { useEffect, useState } from "react";

interface WineFlavorListProps {
  onChange: (value: string[]) => void;
}

export default function WineFlavorList({ onChange }: WineFlavorListProps) {
  const FlavorList = [
    "체리",
    "베리",
    "오크",
    "바닐라",
    "후추",
    "제빵",
    "풀",
    "사과",
    "복숭아",
    "시트러스",
    "트로피컬",
    "미네랄",
    "꽃",
    "담뱃잎",
    "흙",
    "초콜릿",
    "스파이스",
    "카라멜",
    "가죽",
  ];

  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);

  const handleFlavor = (flavor: string) => {
    setSelectedFlavors((prevSelectedFlavors) =>
      prevSelectedFlavors.includes(flavor)
        ? prevSelectedFlavors.filter((f) => f !== flavor)
        : [...prevSelectedFlavors, flavor],
    );
  };

  useEffect(() => {
    onChange(selectedFlavors);
  }, [selectedFlavors, onChange]);

  return (
    <ul className="mt-6 flex flex-wrap items-center gap-2 md:gap-2.5">
      {FlavorList.map((Flavor) => (
        <button
          key={Flavor}
          className={`${selectedFlavors.includes(Flavor) ? "bg-light-purple-100 text-light-white" : "bg-light-white text-light-black"} inline-block whitespace-nowrap rounded-[100px] border border-solid border-light-gray-300 px-2.5 py-1.5 text-md-14px-medium md:px-[18px] md:py-[10px] md:text-lg-16px-medium`}
          onClick={() => handleFlavor(Flavor)}
        >
          {Flavor}
        </button>
      ))}
    </ul>
  );
}
