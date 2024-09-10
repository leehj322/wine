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
    <div className="flex h-[32px] w-full flex-row justify-between">
      <div className="flex flex-row gap-[32px]">
        <button
          type="button"
          className={`flex items-center justify-center text-xl-20px-bold ${
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
          className={`flex items-center justify-center text-xl-20px-bold ${
            activeTab === "wines"
              ? "text-light-gray-800"
              : "text-light-gray-500"
          }`}
          onClick={() => setActiveTab("wines")}
        >
          내가 등록한 와인
        </button>
      </div>
      <div className="flex items-center justify-center text-md-14px-regular text-light-purple-100">
        총 {activeTab === "reviews" ? reviewCount : wineCount}개
      </div>
    </div>
  );
}
