interface TopBarProps {
  activeTab: "reviews" | "wines";
  setActiveTab: (tab: "reviews" | "wines") => void;
  reviewCount: number;
  wineCount: number;
}

export default function TopBar({
  activeTab,
  setActiveTab,
  reviewCount,
  wineCount,
}: TopBarProps) {
  return (
    <div className="mb-[16px] flex h-[26px] w-full flex-row justify-between md:mb-[22px] md:h-[32px]">
      <div className="flex flex-row gap-[16px] md:gap-[32px]">
        <button
          type="button"
          className={`flex items-center justify-center text-2lg-18px-bold md:text-xl-20px-bold ${
            activeTab === "reviews"
              ? "text-light-gray-800"
              : "text-light-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          내가 쓴 후기
        </button>
        <button
          type="button"
          className={`flex items-center justify-center text-2lg-18px-bold md:text-xl-20px-bold ${
            activeTab === "wines"
              ? "text-light-gray-800"
              : "text-light-gray-500"
          }`}
          onClick={() => setActiveTab("wines")}
        >
          내가 등록한 와인
        </button>
      </div>
      <div className="flex items-center justify-center text-xs-12px-regular text-light-purple-100 md:text-md-14px-regular">
        총 {activeTab === "reviews" ? reviewCount : wineCount}개
      </div>
    </div>
  );
}
