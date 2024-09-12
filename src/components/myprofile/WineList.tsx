import { Dispatch, SetStateAction } from "react";
import { MyProfileWine, MyProfileWineData } from "@/types/wines";
import WineCard from "./WineCard";

interface WineListProps {
  wineData: MyProfileWineData;
  setWineData: Dispatch<SetStateAction<MyProfileWineData | undefined>>;
  fetchData: () => Promise<void>;
}

export default function WineList({
  wineData,
  setWineData,
  fetchData,
}: WineListProps) {
  const handleUpdateWine = (updatedWine: MyProfileWine) => {
    setWineData((prev) => {
      if (!prev) {
        return {
          totalCount: 0,
          nextCursor: 0,
          list: [updatedWine],
        };
      }

      return {
        ...prev,
        list: prev.list.map((wine) =>
          wine.id === updatedWine.id ? updatedWine : wine,
        ),
      };
    });
  };

  const handleDeleteWine = async () => {
    await fetchData(); // 와인 삭제 후 데이터 다시 불러오기
  };

  if (wineData.totalCount === 0) {
    return <div>등록된 와인이 없습니다.</div>;
  }
  return (
    <>
      {wineData.list.map((wine) => (
        <WineCard
          key={wine.id}
          wine={wine}
          onUpdate={handleUpdateWine}
          onDelete={handleDeleteWine}
        />
      ))}
    </>
  );
}
